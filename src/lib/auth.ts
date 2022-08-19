import { serverEnv } from '@env/server';
import prisma from '@lib/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { Device, Role } from '@prisma/client';
import type { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

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
			return !profile.notAllowed;
		},
		async session({ session, user }) {
			const devices = await prisma.device.findMany({
				where: {
					user: { id: user.id },
				},
				select: {
					id: true,
					name: true,
					active: true,
				},
			});
			return {
				...session,
				user: {
					...session.user,
					devices,
					id: user.id,
					role: user.role,
				},
			};
		},
	},
	pages: {
		signIn: '/login',
	},
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
			devices: Pick<Device, 'id' | 'name' | 'active'>[];
		};
	}

	interface User {
		role: Role;
	}
}
