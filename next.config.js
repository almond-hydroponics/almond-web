// next.config.js
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

const prod = process.env.NODE_ENV === 'production';

// const ContentSecurityPolicy = `
//   default-src 'self';
//   img-src * 'self' data: https:;
//   script-src 'self' 'unsafe-eval';
//   connect-src 'self' vitals.vercel-insights.com;
//   style-src 'self' 'unsafe-inline' fonts.googleapis.com;
//   font-src 'self' fonts.gstatic.com data:;
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
	pwa: {
		dest: 'public',
		disable: process.env.NODE_ENV === 'development',
		runtimeCaching,
		fallbacks: {
			// image: '/static/images/fallback.png',
			font: '/static/font/fallback.woff2',
		},
	},
	images: {
		// disableStaticImages: true,
		domains: ['static.almondhydroponics.com'],
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
