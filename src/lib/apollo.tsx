import fetch from 'isomorphic-unfetch';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from 'apollo-link-error';
import { WebSocketLink } from '@apollo/client/link/ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import environment from '@lib/environment';

let accessToken;

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
	return new WebSocketLink(
		new SubscriptionClient(environment.websocketUrl, {
			lazy: true,
			reconnect: true,
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

export default function createApolloClient(initialState, headers) {
	const ssrMode = typeof window === 'undefined';
	let link;
	if (ssrMode) {
		link = createHttpLink(headers);
	} else {
		link = createWSLink();
	}
	return new ApolloClient({
		ssrMode,
		link,
		cache: new InMemoryCache().restore(initialState),
	});
}
