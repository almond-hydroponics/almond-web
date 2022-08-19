import { envsafe, invalidEnvError, makeValidator, str } from 'envsafe';

import { browserEnv } from './browser';

if (typeof window !== 'undefined') {
	throw new Error(
		'This should only be included on the client (but the env vars wont be exposed)'
	);
}

const githubParser = makeValidator<string>((input) => {
	if (process.env.AUTH_PROVIDER === 'github' && input === '') {
		throw invalidEnvError('github config', input);
	}
	return input;
});

const googleParser = makeValidator<string>((input) => {
	if (process.env.AUTH_PROVIDER === 'google' && input === '') {
		throw invalidEnvError('google config', input);
	}
	return input;
});

const cloudinaryParser = makeValidator<string>((input) => {
	if (browserEnv.NEXT_PUBLIC_ENABLE_IMAGE_UPLOAD && input === '') {
		throw invalidEnvError('cloudinary config', input);
	}
	return input;
});

const almondParser = makeValidator<string>((input) => {
	if (process.env.NEXT_APP_URL && input === '') {
		throw invalidEnvError('almond config', input);
	}
	return input;
});

export const serverEnv = {
	...browserEnv,
	...envsafe({
		DATABASE_URL: str(),
		NEXT_APP_URL: almondParser({
			allowEmpty: true,
			devDefault: 'http://localhost:3000',
		}),
		NEXTAUTH_SECRET: str({
			devDefault: 'blah-blah-blah',
		}),
		GITHUB_ID: githubParser({ allowEmpty: true, default: '' }),
		GITHUB_SECRET: githubParser({ allowEmpty: true, default: '' }),
		// GITHUB_ALLOWED_ORG: githubParser({ allowEmpty: true, default: '' }),
		GOOGLE_CLIENT_ID: googleParser({ allowEmpty: true, default: '' }),
		GOOGLE_CLIENT_SECRET: googleParser({ allowEmpty: true, default: '' }),
		CLOUDINARY_CLOUD_NAME: cloudinaryParser({ allowEmpty: true, default: '' }),
		CLOUDINARY_API_KEY: cloudinaryParser({ allowEmpty: true, default: '' }),
		CLOUDINARY_API_SECRET: cloudinaryParser({ allowEmpty: true, default: '' }),
	}),
};
