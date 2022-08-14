import environment from '@lib/environment';
import prisma from '@lib/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
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
