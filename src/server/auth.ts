import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { Device } from '@prisma/client';
import { Role } from '@prisma/client';
import type { GetServerSidePropsContext } from 'next';
import { NextAuthOptions, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { env } from '../env.mjs';
import { prisma } from './db';

/**
 * Module augmentation for `next-auth` types.
 * Allows us to add custom properties to the `session` object and keep type
 * safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 **/
declare module 'next-auth' {
	interface Session {
		// @ts-expect-error
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

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks,
 * etc.
 *
 * @see https://next-auth.js.org/configuration/options
 **/
export const authOptions: NextAuthOptions = {
	callbacks: {
		// @ts-expect-error
		async session({ session, user }) {
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
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		}),
		/**
		 * ...add more providers here
		 *
		 * Most other providers require a bit more work than the Discord provider.
		 * For example, the GitHub provider requires you to add the
		 * `refresh_token_expires_in` field to the Account model. Refer to the
		 * NextAuth.js docs for the provider you want to use. Example:
		 * @see https://next-auth.js.org/providers/github
		 **/
	],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the
 * `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 **/
export const getServerAuthSession = (ctx: {
	req: GetServerSidePropsContext['req'];
	res: GetServerSidePropsContext['res'];
}) => {
	return getServerSession(ctx.req, ctx.res, authOptions);
};
