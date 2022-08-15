import environment from '@lib/environment';
import prisma from '@lib/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { OAuth2Client } from 'google-auth-library';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

// This is an instance of a Google client that we need to ask google information about the user
const googleAuthClient = new OAuth2Client(environment.googleClientId);

export default NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			id: 'google',
			clientId: environment.googleClientId,
			clientSecret: environment.googleClientSecret,
		}),
		CredentialsProvider({
			type: 'credentials',
			id: 'googleonetap',
			name: 'google-one-tap',
			credentials: {
				credential: { type: 'text' },
			},
			//@ts-expect-error
			authorize: async (credentials: any) => {
				const token = credentials.credential;
				const ticket = await googleAuthClient.verifyIdToken({
					idToken: token,
					audience: environment.googleClientId,
				});
				const payload = ticket.getPayload();

				if (!payload) {
					throw new Error('Cannot extract payload from signin token');
				}

				// If the request went well, we received all this info from Google.
				const {
					email,
					sub,
					given_name,
					family_name,
					email_verified,
					picture: image,
				} = payload;

				if (!email) {
					throw new Error('Email not available');
				}

				let user = await prisma.user.findFirst({
					where: { email },
				});

				// If there's no user, we need to create it
				if (!user) {
					user = await prisma.user.create({
						// @ts-ignore
						name: `${given_name} ${family_name}`,
						email,
						image,
						emailVerified: email_verified ? new Date() : undefined,
					});
				}

				// Let's also retrieve any account for the user from the DB, if any
				// const account =
				// 	user &&
				// 	(await adapter.getUserByAccount({ provider: 'google', id: sub }));
				//
				// // In case the account is not yet present on our DB, we want to create one and link to the user
				// if (!account && user) {
				// 	await adapter.linkAccount({
				// 		userId: user.id,
				// 		provider: 'google',
				// 		providerAccountId: sub,
				// 		accessToken: null,
				// 		accessTokenExpires: null,
				// 		refresh_token: null,
				// 	});
				// }
				// // We can finally return the retrieved or created user
				// return user;
				return;
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	pages: {},
	events: {},
	debug: process.env.NODE_ENV === 'development',
});
