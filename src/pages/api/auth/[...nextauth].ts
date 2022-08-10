import { ApolloClient, InMemoryCache } from '@apollo/client';
import environment from '@lib/environment';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client/scripts/default-index';
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
	callbacks: {
		// async signIn({ user, account, profile }) {
		// 	if (account.provider === 'google') {
		// 		console.log(
		// 			'Class: callbacks, Function: signIn, Line 96 user():',
		// 			user,
		// 		);
		// 		console.log(
		// 			'Class: callbacks, Function: signIn, Line 101 profile():',
		// 			profile,
		// 		);
		// 		return profile.email;
		// 	}
		// 	return true;
		// },
		async jwt({ token, user, account }) {
			if (account && user) {
				return {
					...token,
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					avatar: user.avatar,
					// accessToken: user.access_token,
					// refreshToken: user.refresh_token,
					// expiresIn: Date.now() + +user.expires_in,
					// // @ts-expect-error
					// userRoles: user.user.roles,
				};
			}
			return token;
			//
			// if (Date.now() < token.expiresIn) {
			// 	return token;
			// }
			// return await refreshAccessToken(token);
		},
		async session({ session, token }) {
			session.user.firstName = token.firstName as string;
			session.user.lastName = token.lastName as string;
			session.user.email = token.email as string;
			session.user.avatar = token.avatar as string;
			// session.user.name = jwtDecode(token.accessToken as string)['sub'];
			// session.user.email = jwtDecode(token.accessToken as string)['sub'];
			// session.user.accessToken = token.accessToken as string;
			// session.user.refreshToken = token.refreshToken as string;
			// session.user.accessTokenExpires = token.expiresIn as string;
			// session.user.userRoles = token.userRoles;
			session.error = token.error;

			return session;
		},
	},
	pages: {
		// signIn: '/',
		// signOut: '/auth/signout', // Displays form with sign out button
		// error: '/auth/error', // Error code passed in query string as ?error=
		// verifyRequest: '/auth/verify-request', // Used for check email page
		// newUser: null // If set, new users will be directed here on first sign in
	},
	events: {
		// @ts-expect-error
		async signIn({
			user,
			account,
			profile,
		}): Promise<string | boolean | undefined> {
			if (account.provider === 'google') {
				console.log(
					'Class: callbacks, Function: signIn, Line 96 user():',
					user
				);
				console.log(
					'Class: callbacks, Function: signIn, Line 101 profile():',
					profile
				);
				return profile?.email;
			}
			return true;
		},
	},
	debug: process.env.NODE_ENV === 'development',
});
