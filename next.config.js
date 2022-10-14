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

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' giscus.app www.googletagmanager.com www.google-analytics.com;
  style-src 'self' 'unsafe-inline' https://*.googletagmanager.com;
  img-src * blob: data:;
  media-src 'none';
  connect-src 'self' vitals.vercel-insights.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com data:;
  font-src 'self' data:
`;

const securityHeaders = [
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
	{
		key: 'Content-Security-Policy',
		value: ContentSecurityPolicy.replace(/\n/g, ''),
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
	{
		key: 'Referrer-Policy',
		value: 'strict-origin-when-cross-origin',
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
	{
		key: 'X-Frame-Options',
		value: 'DENY',
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
	{
		key: 'X-Content-Type-Options',
		value: 'nosniff',
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
	{
		key: 'X-DNS-Prefetch-Control',
		value: 'on',
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
	{
		key: 'Strict-Transport-Security',
		value: 'max-age=31536000; includeSubDomains',
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
	{
		key: 'Permissions-Policy',
		value: 'camera=(), microphone=(), geolocation=()',
	},
];

module.exports = withPWA({
	output: 'standalone',
	swcMinify: true,
	reactStrictMode: true,
	pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
	images: {
		domains: [
			'static.almondhydroponics.com',
			'res.cloudinary.com',
			'avatars.githubusercontent.com',
			'lh3.googleusercontent.com',
			'dev-to-uploads.s3.amazonaws.com',
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
	webpack: (config, { dev, isServer }) => {
		config.module.rules.push({
			test: /\.(png|jpe?g|gif|mp4)$/i,
			use: [
				{
					loader: 'file-loader',
					options: {
						publicPath: '/_next',
						name: 'static/media/[name].[hash].[ext]',
					},
				},
			],
		});

		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		});

		// if (!dev && !isServer) {
		// 	// Replace React with Preact only in client production build
		// 	Object.assign(config.resolve.alias, {
		// 		'react/jsx-runtime.js': 'preact/compat/jsx-runtime',
		// 		react: 'preact/compat',
		// 		'react-dom/test-utils': 'preact/test-utils',
		// 		'react-dom': 'preact/compat',
		// 	});
		// }

		return config;
	},
});
