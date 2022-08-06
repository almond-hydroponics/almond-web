if (!self.define) {
	let e,
		s = {};
	const n = (n, a) => (
		(n = new URL(n + '.js', a).href),
		s[n] ||
			new Promise((s) => {
				if ('document' in self) {
					const e = document.createElement('script');
					(e.src = n), (e.onload = s), document.head.appendChild(e);
				} else (e = n), importScripts(n), s();
			}).then(() => {
				let e = s[n];
				if (!e) throw new Error(`Module ${n} didn’t register its module`);
				return e;
			})
	);
	self.define = (a, i) => {
		const c =
			e ||
			('document' in self ? document.currentScript.src : '') ||
			location.href;
		if (s[c]) return;
		let r = {};
		const t = (e) => n(e, c),
			d = { module: { uri: c }, exports: r, require: t };
		s[c] = Promise.all(a.map((e) => d[e] || t(e))).then((e) => (i(...e), r));
	};
}
define(['./workbox-6316bd60'], function (e) {
	'use strict';
	importScripts(
		'fallback-mZjrIYDqTjFDmgDXNVJs0.js',
		'worker-mZjrIYDqTjFDmgDXNVJs0.js'
	),
		self.skipWaiting(),
		e.clientsClaim(),
		e.precacheAndRoute(
			[
				{
					url: '/_next/static/chunks/14.2a0c4880869dc43f.js',
					revision: '2a0c4880869dc43f',
				},
				{
					url: '/_next/static/chunks/144-3a64ac24cf8a6d96.js',
					revision: '3a64ac24cf8a6d96',
				},
				{
					url: '/_next/static/chunks/210-d4f579fc89e3fc28.js',
					revision: 'd4f579fc89e3fc28',
				},
				{
					url: '/_next/static/chunks/394-4c427cf44bfed360.js',
					revision: '4c427cf44bfed360',
				},
				{
					url: '/_next/static/chunks/449-884c751f9efffb0e.js',
					revision: '884c751f9efffb0e',
				},
				{
					url: '/_next/static/chunks/505-ca4404dcdf3696b5.js',
					revision: 'ca4404dcdf3696b5',
				},
				{
					url: '/_next/static/chunks/511-5a16e50958a810e7.js',
					revision: '5a16e50958a810e7',
				},
				{
					url: '/_next/static/chunks/559-83e0289377a25d6f.js',
					revision: '83e0289377a25d6f',
				},
				{
					url: '/_next/static/chunks/674-b0d19665cea36dd2.js',
					revision: 'b0d19665cea36dd2',
				},
				{
					url: '/_next/static/chunks/699-27fa3a330611485a.js',
					revision: '27fa3a330611485a',
				},
				{
					url: '/_next/static/chunks/framework-3581bb99e4b98af8.js',
					revision: '3581bb99e4b98af8',
				},
				{
					url: '/_next/static/chunks/main-d63eaddef84f10d4.js',
					revision: 'd63eaddef84f10d4',
				},
				{
					url: '/_next/static/chunks/pages/404-f900bd7000bd795a.js',
					revision: 'f900bd7000bd795a',
				},
				{
					url: '/_next/static/chunks/pages/_app-47282505ae49fac2.js',
					revision: '47282505ae49fac2',
				},
				{
					url: '/_next/static/chunks/pages/_error-e5eea1c1bbdb7181.js',
					revision: 'e5eea1c1bbdb7181',
				},
				{
					url: '/_next/static/chunks/pages/_offline-5bdf0f5022c1897b.js',
					revision: '5bdf0f5022c1897b',
				},
				{
					url: '/_next/static/chunks/pages/blog-3f50e31c02db6d25.js',
					revision: '3f50e31c02db6d25',
				},
				{
					url: '/_next/static/chunks/pages/blog-search-f5c5ef3e8c995952.js',
					revision: 'f5c5ef3e8c995952',
				},
				{
					url: '/_next/static/chunks/pages/blog/%5Bslug%5D-22190788e09f2349.js',
					revision: '22190788e09f2349',
				},
				{
					url: '/_next/static/chunks/pages/company-terms-118b9b059c308c53.js',
					revision: '118b9b059c308c53',
				},
				{
					url: '/_next/static/chunks/pages/home-102dbda1c52d567b.js',
					revision: '102dbda1c52d567b',
				},
				{
					url: '/_next/static/chunks/pages/index-47e044fd12602208.js',
					revision: '47e044fd12602208',
				},
				{
					url: '/_next/static/chunks/pages/store-98e63a5e56d93eea.js',
					revision: '98e63a5e56d93eea',
				},
				{
					url: '/_next/static/chunks/polyfills-5cd94c89d3acac5f.js',
					revision: '99442aec5788bccac9b2f0ead2afdd6b',
				},
				{
					url: '/_next/static/chunks/webpack-19c9e565dd21e05e.js',
					revision: '19c9e565dd21e05e',
				},
				{
					url: '/_next/static/css/351d4020faf408f5.css',
					revision: '351d4020faf408f5',
				},
				{
					url: '/_next/static/mZjrIYDqTjFDmgDXNVJs0/_buildManifest.js',
					revision: '223ba4349df1e895f6aa00d1312f9b7f',
				},
				{
					url: '/_next/static/mZjrIYDqTjFDmgDXNVJs0/_middlewareManifest.js',
					revision: '468e9a0ecca0c65bcb0ee673b762445d',
				},
				{
					url: '/_next/static/mZjrIYDqTjFDmgDXNVJs0/_ssgManifest.js',
					revision: '5352cb582146311d1540f6075d1f265e',
				},
				{
					url: '/_next/static/media/ajax-loader.0b80f665.gif',
					revision: '0b80f665',
				},
				{
					url: '/_next/static/media/sanfranciscodisplay-bold-webfont.6c9eaeff.woff',
					revision: '6c9eaeff',
				},
				{
					url: '/_next/static/media/sanfranciscodisplay-medium-webfont.c31d5d9e.woff',
					revision: 'c31d5d9e',
				},
				{
					url: '/_next/static/media/sanfranciscodisplay-regular-webfont.5a0b539f.woff',
					revision: '5a0b539f',
				},
				{
					url: '/_next/static/media/sanfranciscodisplay-semibold-webfont.fb92d598.woff',
					revision: 'fb92d598',
				},
				{
					url: '/_next/static/media/sanfranciscodisplay-thin-webfont.2dce2483.woff',
					revision: '2dce2483',
				},
				{
					url: '/_next/static/media/sanfranciscodisplay-ultralight-webfont.0087e0b0.woff',
					revision: '0087e0b0',
				},
				{
					url: '/_next/static/media/slick.25572f22.eot',
					revision: '25572f22',
				},
				{
					url: '/_next/static/media/slick.653a4cbb.woff',
					revision: '653a4cbb',
				},
				{
					url: '/_next/static/media/slick.6aa1ee46.ttf',
					revision: '6aa1ee46',
				},
				{
					url: '/_next/static/media/slick.f895cfdf.svg',
					revision: 'f895cfdf',
				},
				{ url: '/_offline', revision: 'mZjrIYDqTjFDmgDXNVJs0' },
				{
					url: '/android-icon-144x144.png',
					revision: '9bcff944ed57dcb379297511c652ec18',
				},
				{
					url: '/android-icon-192x192.png',
					revision: '08d9abd111c11302eca6baeb59240fce',
				},
				{
					url: '/android-icon-36x36.png',
					revision: '997be995dbe6a21f9f7efef56f43f38d',
				},
				{
					url: '/android-icon-48x48.png',
					revision: '12c97adbd39d9ca41389dc476c4f2877',
				},
				{
					url: '/android-icon-72x72.png',
					revision: 'b0292d7ae66f04dc4965f67229ee2c7f',
				},
				{
					url: '/android-icon-96x96.png',
					revision: 'f988b54bfd969171ac867d397036d1e0',
				},
				{
					url: '/apple-icon-114x114.png',
					revision: 'ff67cd64061101c9d6c409a7f6869bed',
				},
				{
					url: '/apple-icon-120x120.png',
					revision: '1098045145ec6f164fae94a73431ae0b',
				},
				{
					url: '/apple-icon-144x144.png',
					revision: '9bcff944ed57dcb379297511c652ec18',
				},
				{
					url: '/apple-icon-152x152.png',
					revision: 'baad529fa18fe738e22832e6303f29e0',
				},
				{
					url: '/apple-icon-180x180.png',
					revision: '6d2ead92dcf05bd94b48fc51ba8dd1cc',
				},
				{
					url: '/apple-icon-57x57.png',
					revision: '99df99467e1342367d65a7d6333edea5',
				},
				{
					url: '/apple-icon-60x60.png',
					revision: 'fe36d1bc9ddd4e6a0a7f1307691381da',
				},
				{
					url: '/apple-icon-72x72.png',
					revision: 'b0292d7ae66f04dc4965f67229ee2c7f',
				},
				{
					url: '/apple-icon-76x76.png',
					revision: '0a2ce5ee67314e9a87067629798a82c4',
				},
				{
					url: '/apple-icon-precomposed.png',
					revision: 'e631c636bb22163202f496b748cfc80d',
				},
				{
					url: '/apple-icon.png',
					revision: 'e631c636bb22163202f496b748cfc80d',
				},
				{
					url: '/browserconfig.xml',
					revision: '653d077300a12f09a69caeea7a8947f8',
				},
				{
					url: '/favicon-16x16.png',
					revision: 'aca6299766240a4a359b8417c6396471',
				},
				{
					url: '/favicon-32x32.png',
					revision: 'b86a55042059fce71782925d33ee4864',
				},
				{
					url: '/favicon-96x96.png',
					revision: 'f988b54bfd969171ac867d397036d1e0',
				},
				{ url: '/favicon.ico', revision: '04fcf4873052b5134365e9f9fe9387a1' },
				{
					url: '/firebase-messaging-sw.js',
					revision: '0ca609562c1ad2463191190fe604f8e6',
				},
				{
					url: '/img/hydroponics.webp',
					revision: '8e1ff3bc493ad9fb9d54e08c8605b930',
				},
				{
					url: '/img/javascript-functions-thumbnail.jpeg',
					revision: '10df683691909a8af09072b15de0ee00',
				},
				{
					url: '/img/readme.png',
					revision: '1bc868835610f32abe3c0d8f09b95998',
				},
				{ url: '/logo.png', revision: '4ecaca0f8f61a0228279da1f805bdf06' },
				{
					url: '/manifest.json',
					revision: 'bf2296da20e3b481a992eba1cea2c44d',
				},
				{
					url: '/ms-icon-144x144.png',
					revision: '9bcff944ed57dcb379297511c652ec18',
				},
				{
					url: '/ms-icon-150x150.png',
					revision: '19880523a9a92b2ebd918c1e38e664e1',
				},
				{
					url: '/ms-icon-310x310.png',
					revision: '4ecaca0f8f61a0228279da1f805bdf06',
				},
				{
					url: '/ms-icon-70x70.png',
					revision: '2dac5703fb663c8b5444934741a8de56',
				},
				{ url: '/robots.txt', revision: '466f5d83d25c9578375e389c93e4cac5' },
				{
					url: '/static/images/fallback.png',
					revision: '38e7c435a0fe48df4e951a158f1d213c',
				},
			],
			{ ignoreURLParametersMatching: [] }
		),
		e.cleanupOutdatedCaches(),
		e.registerRoute(
			'/',
			new e.NetworkFirst({
				cacheName: 'start-url',
				plugins: [
					{
						cacheWillUpdate: async ({
							request: e,
							response: s,
							event: n,
							state: a,
						}) =>
							s && 'opaqueredirect' === s.type
								? new Response(s.body, {
										status: 200,
										statusText: 'OK',
										headers: s.headers,
								  })
								: s,
					},
					{ handlerDidError: async ({ request: e }) => self.fallback(e) },
				],
			}),
			'GET'
		),
		e.registerRoute(
			/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
			new e.CacheFirst({
				cacheName: 'google-fonts-webfonts',
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
					{ handlerDidError: async ({ request: e }) => self.fallback(e) },
				],
			}),
			'GET'
		),
		e.registerRoute(
			/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
			new e.StaleWhileRevalidate({
				cacheName: 'google-fonts-stylesheets',
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
					{ handlerDidError: async ({ request: e }) => self.fallback(e) },
				],
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'static-font-assets',
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
					{ handlerDidError: async ({ request: e }) => self.fallback(e) },
				],
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'static-image-assets',
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
					{ handlerDidError: async ({ request: e }) => self.fallback(e) },
				],
			}),
			'GET'
		),
		e.registerRoute(
			/\/_next\/image\?url=.+$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'next-image',
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
					{ handlerDidError: async ({ request: e }) => self.fallback(e) },
				],
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:mp3|wav|ogg)$/i,
			new e.CacheFirst({
				cacheName: 'static-audio-assets',
				plugins: [
					new e.RangeRequestsPlugin(),
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
					{ handlerDidError: async ({ request: e }) => self.fallback(e) },
				],
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:mp4)$/i,
			new e.CacheFirst({
				cacheName: 'static-video-assets',
				plugins: [
					new e.RangeRequestsPlugin(),
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
					{ handlerDidError: async ({ request: e }) => self.fallback(e) },
				],
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:js)$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'static-js-assets',
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
					{ handlerDidError: async ({ request: e }) => self.fallback(e) },
				],
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:css|less)$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'static-style-assets',
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
					{ handlerDidError: async ({ request: e }) => self.fallback(e) },
				],
			}),
			'GET'
		),
		e.registerRoute(
			/\/_next\/data\/.+\/.+\.json$/i,
			new e.StaleWhileRevalidate({
				cacheName: 'next-data',
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
					{ handlerDidError: async ({ request: e }) => self.fallback(e) },
				],
			}),
			'GET'
		),
		e.registerRoute(
			/\.(?:json|xml|csv)$/i,
			new e.NetworkFirst({
				cacheName: 'static-data-assets',
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
					{ handlerDidError: async ({ request: e }) => self.fallback(e) },
				],
			}),
			'GET'
		),
		e.registerRoute(
			({ url: e }) => {
				if (!(self.origin === e.origin)) return !1;
				const s = e.pathname;
				return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
			},
			new e.NetworkFirst({
				cacheName: 'apis',
				networkTimeoutSeconds: 10,
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
					{ handlerDidError: async ({ request: e }) => self.fallback(e) },
				],
			}),
			'GET'
		),
		e.registerRoute(
			({ url: e }) => {
				if (!(self.origin === e.origin)) return !1;
				return !e.pathname.startsWith('/api/');
			},
			new e.NetworkFirst({
				cacheName: 'others',
				networkTimeoutSeconds: 10,
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
					{ handlerDidError: async ({ request: e }) => self.fallback(e) },
				],
			}),
			'GET'
		),
		e.registerRoute(
			({ url: e }) => !(self.origin === e.origin),
			new e.NetworkFirst({
				cacheName: 'cross-origin',
				networkTimeoutSeconds: 10,
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
					{ handlerDidError: async ({ request: e }) => self.fallback(e) },
				],
			}),
			'GET'
		);
});
