// next.config.js
const runtimeCaching = require('next-pwa/cache');
const crypto = require('crypto');
const withPWA = require('next-pwa')({
	dest: 'public',
	disable: process.env.NODE_ENV === 'development',
	runtimeCaching,
	fallbacks: {
		// image: '/static/images/fallback.png',
		font: '/static/font/fallback.woff2',
	},
});

const prod = process.env.NODE_ENV === 'production';

const cshHash = crypto.createHash('sha256');

// const ContentSecurityPolicy = `
//   default-src 'self';
//   img-src * 'self' https://*.google-analytics.com https://*.googletagmanager.com data: https:;
//   script-src 'self' 'unsafe-inline' https://*.googletagmanager.com;
//   connect-src 'self' vitals.vercel-insights.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com;
//   style-src 'self';
//   font-src 'self' data:;
// `;

const securityHeaders = [
	{
		key: 'X-Content-Type-Options',
		value: 'nosniff',
	},
	{
		key: 'Permissions-Policy',
		value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
	},
	{
		key: 'X-Frame-Options',
		value: 'SAMEORIGIN',
	},
	{
		key: 'X-XSS-Protection',
		value: '1; mode=block',
	},
	{
		key: 'X-DNS-Prefetch-Control',
		value: 'on',
	},
	// {
	// 	key: 'Content-Security-Policy',
	// 	value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
	// },
];

module.exports = withPWA({
	output: 'standalone',
	swcMinify: true,
	reactStrictMode: true,
	images: {
		domains: [
			'static.almondhydroponics.com',
			'res.cloudinary.com',
			'avatars.githubusercontent.com',
			'lh3.googleusercontent.com',
		],
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	poweredByHeader: false,
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: securityHeaders,
			},
		];
	},
});
