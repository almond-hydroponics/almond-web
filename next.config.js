// next.config.js
const path = require('path');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

const isDevelopment = () => process.env.NODE_ENV === 'development';

// const ContentSecurityPolicy = `
//   default-src 'self';
//   script-src 'self'${isDevelopment() ? " 'unsafe-eval'" : ''};
//   connect-src 'self' vitals.vercel-insights.com;
//   style-src 'self' 'unsafe-inline';
//   font-src 'self';
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
		disable: isDevelopment(),
		runtimeCaching,
		buildExcludes: [/middleware-manifest.json$/],
		// fallbacks: {
		//   image: '/static/images/fallback.png',
		// }
	},
	devIndicators: {
		autoPrerender: false,
	},
	// images: {
	//   // disableStaticImages: true,
	//   domains: ['https://www.safaricom.co.ke']
	// },
	sassOptions: {
		includePaths: [path.join(__dirname, 'src/assets/scss/styles')],
	},
	eslint: {
		// Warning: If set to true, this allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},
	poweredByHeader: false,
	staticPageGenerationTimeout: 900,
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: securityHeaders,
			},
		];
	},
});
