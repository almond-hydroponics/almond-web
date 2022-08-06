import { Session } from 'next-auth';

declare module 'next-auth' {
	interface Session {
		user: {
			firstName: string | null;
			lastName: string | null;
			email: string | null;
			avatar: string | null;
			accessToken: string | null;
			refreshToken: string | null;
			accessTokenExpires: string | null;
			userRoles: any;
		};
	}
}
