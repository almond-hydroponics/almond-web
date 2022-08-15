interface Environment {
	// environment: string;
	// isProduction: boolean;
	graphqlUrl: string;
	websocketUrl: string;
	clientUrl: string;
	apiToken: string;
	googleClientId: string;
	googleClientSecret: string;
}

export const environment: Environment = {
	// environment: process.env.NEXT_PUBLIC_ENVIRONMENT!,
	// isProduction: process.env.NEXT_PUBLIC_ENVIRONMENT! === 'production',
	graphqlUrl: process.env.NEXT_PUBLIC_ALMOND_API!,
	websocketUrl: process.env.NEXT_PUBLIC_WEBSOCKET_ALMOND_API!,
	clientUrl: process.env.NEXT_PUBLIC_ALMOND_URL!,
	apiToken: process.env.NEXT_API_TOKEN!,
	googleClientId: process.env.NEXT_PUBLIC_GOOGLE_ID!,
	googleClientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET!,
};

export default environment;
