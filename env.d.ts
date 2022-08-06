declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: string;
			NEXT_PUBLIC_ALMOND_API: string;
			SERVER_API_ENDPOINT: string;
			BROWSER_API_ENDPOINT: string;
			WEBSOCKET_API_URL: string;
			PAT: string;
			NPM_TOKEN: string;
			PUBLISH_CI: string;
		}
	}
}

export {};
