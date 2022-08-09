import { IncomingMessage, ServerResponse } from 'http';

import {
	ApolloClient,
	HttpLink,
	InMemoryCache,
	NormalizedCacheObject,
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import environment from '@lib/environment';
import { onError } from 'apollo-link-error';
import { createClient } from 'graphql-ws';
import fetch from 'isomorphic-unfetch';
import { useMemo } from 'react';

let accessToken;
let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

export type ResolverContext = {
	req?: IncomingMessage;
	res?: ServerResponse;
};

const requestAccessToken = async () => {
	if (accessToken) return;

	const res = await fetch(`${process.env.APP_HOST}/api/session`);
	if (res.ok) {
		const json = await res.json();
		accessToken = json.accessToken;
	} else {
		accessToken = 'public';
	}
};

// remove cached token on 401 from the server
const resetTokenLink = onError(({ networkError }) => {
	if (networkError && networkError.name === 'ServerError') {
		accessToken = null;
	}
});

const createHttpLink = (headers) => {
	return new HttpLink({
		uri: environment.graphqlUrl,
		credentials: 'include',
		headers,
		fetch,
	});
};

const createWSLink = () => {
	return new GraphQLWsLink(
		createClient({
			url: environment.websocketUrl,
			lazy: true,
			connectionParams: async () => {
				await requestAccessToken();
				return {
					headers: {
						authorization: accessToken ? `Bearer ${accessToken}` : '',
					},
				};
			},
		})
	);
};

export function createApolloClient(context?: ResolverContext) {
	const ssrMode = typeof window === 'undefined';
	let link;
	if (ssrMode) {
		link = createHttpLink(context);
	} else {
		link = createWSLink();
	}
	return new ApolloClient({
		ssrMode,
		link,
		cache: new InMemoryCache(),
	});
}

export function initializeApollo(
	initialState: any = null,
	// Pages with Next.js data fetching methods, like `getStaticProps`, can send
	// a custom context which will be used by `SchemaLink` to server render pages
	context?: ResolverContext
) {
	const _apolloClient = apolloClient ?? createApolloClient(context);

	// If your page has Next.js data fetching methods that use Apollo Client, the initial state
	// get hydrated here
	if (initialState) {
		_apolloClient.cache.restore(initialState);
	}
	// For SSG and SSR always create a new Apollo Client
	if (typeof window === 'undefined') return _apolloClient;
	// Create the Apollo Client once in the client
	if (!apolloClient) apolloClient = _apolloClient;

	return _apolloClient;
}

export function useApollo(initialState: any) {
	return useMemo(() => initializeApollo(initialState), [initialState]);
}
