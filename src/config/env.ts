import getConfig from 'next/config';

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

export const IS_DEBUG = process.env.NODE_ENV !== 'production';
export const IS_DEV = IS_DEBUG;
export const IS_SERVER = typeof window === 'undefined';

export const ENV = process.env.NODE_ENV || 'development';

export const {
	CLIENT_DOMAIN,
	BROWSER_API_ENDPOINT,
	GITHUB_CLIENT_ID,
	WEBSOCKET_API_URL,
} = publicRuntimeConfig;

export const { SERVER_API_ENDPOINT } = serverRuntimeConfig;
