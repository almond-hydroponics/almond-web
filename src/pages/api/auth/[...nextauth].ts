import { ApolloClient, InMemoryCache } from '@apollo/client';
import environment from '@lib/environment';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { LoginDocument } from '../../../generated/graphql';

interface AuthResponse {
	access_token: string;
	refresh_token: string;
	expires_in: string;
}

interface Token {
	accessToken?: string;
	refreshToken?: string;
	expiresIn?: string;

	[x: string]: any;
}

const client = new ApolloClient({
	uri: environment.graphqlUrl,
	cache: new InMemoryCache(),
});

const refreshAccessToken = async (token: Token) => {
	const payload = {
		token: token.refreshToken,
	};

	try {
		const { data } = await axios.post<AuthResponse>(
			`${environment.graphqlUrl}/refresh-token`,
			payload
		);

		return {
			...token,
			accessToken: data.access_token,
			refreshToken: data.refresh_token,
			expiresIn: Date.now() + +data.expires_in,
		};
	} catch (e: any) {
		return {
			...token,
			error: 'RefreshAccessTokenError',
		};
	}
};

const prisma = new PrismaClient();

export default NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			id: 'credentials',
			name: 'email',
			credentials: {
				email: {
					label: 'Email',
					type: 'text',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, _req) {
				const payload = {
					email: credentials?.email,
					password: credentials?.password,
				};

				try {
					const { data } = await client.mutate({
						mutation: LoginDocument,
						variables: payload,
					});

					return data.login;
				} catch (e) {
					return {
						error: 'LoginError',
					};
				}
			},
		}),
		GoogleProvider({
			id: 'google',
			clientId: environment.googleClientId,
			clientSecret: environment.googleClientSecret,
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	pages: {},
	events: {},
	debug: process.env.NODE_ENV === 'development',
});
