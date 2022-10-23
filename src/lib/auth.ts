import { serverEnv } from '@env/server';
import prisma from '@lib/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { Device, Role } from '@prisma/client';
import type { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

const refreshAccessToken = async (token) => {
	try {
		const url =
			'https://oauth2.googleapis.com/token?' +
			new URLSearchParams({
				client_id: serverEnv.GOOGLE_CLIENT_ID,
				client_secret: serverEnv.GOOGLE_CLIENT_SECRET,
				grant_type: 'refresh_token',
				refresh_token: token.refreshToken,
			});

		const response = await fetch(url, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			method: 'POST',
		});

		const refreshedTokens = await response.json();

		if (!response.ok) {
			throw refreshedTokens;
		}

		return {
			...token,
			accessToken: refreshedTokens.access_token,
			accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
			refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
		};
	} catch (error) {
		return {
			...token,
			error: 'RefreshAccessTokenError',
		};
	}
};

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: serverEnv.GOOGLE_CLIENT_ID,
			clientSecret: serverEnv.GOOGLE_CLIENT_SECRET,
		}),
		GithubProvider({
			clientId: serverEnv.GITHUB_ID,
			clientSecret: serverEnv.GITHUB_SECRET,
		}),
	],
	callbacks: {
		async signIn({ user, account, profile }) {
			// @ts-expect-error
			return !profile.notAllowed;
		},
		// async jwt({ token, user, account }) {
		// 	if (account && user) {
		// 		return {
		// 			accessToken: account.access_token,
		// 			// @ts-expect-error
		// 			accessTokenExpires: Date.now() + +account?.expires_at * 1000,
		// 			refreshToken: account.refresh_token,
		// 			user,
		// 		};
		// 	}
		//
		// 	// Return previous token if the access token has not expired yet
		// 	// @ts-expect-error
		// 	if (Date.now() < +token.accessTokenExpires) {
		// 		return token;
		// 	}
		// 	return refreshAccessToken(token);
		// },
		// @ts-expect-error
		async session({ session, user, token }) {
			const device = await prisma.device.findFirst({
				where: {
					userId: user?.id,
					active: true,
				},
				select: {
					id: true,
					name: true,
					active: true,
					identifier: true,
				},
			});

			return {
				...session,
				user: {
					...session.user,
					device: device || {},
					id: user.id || '',
					role: user.role || Role.USER,
				},
			};
		},
	},
	// pages: {
	// 	signIn: '/login',
	// },
	secret: serverEnv.NEXTAUTH_SECRET,
	debug: process.env.NODE_ENV === 'development',
};

declare module 'next-auth' {
	interface Session {
		user: {
			id: string;
			name: string;
			email: string;
			image?: string | null;
			role: Role;
			device: Pick<Device, 'id' | 'name' | 'active' | 'identifier'>;
		};
	}

	interface User {
		role: Role;
	}
}
