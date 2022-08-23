// styles
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'aos/dist/aos.css';
import 'assets/css/index.css';
import 'assets/css/fonts.css';

import { ErrorBoundary } from '@components/molecules/ErrorBoundary';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { transformer } from '@lib/trpc';
import { AppRouter } from '@server/routers/_app';
import store from '@store/index';
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { withTRPC } from '@trpc/next';
import { TRPCError } from '@trpc/server';
import { pageview } from '@utils/gtag';
import { SessionProvider } from 'next-auth/react';
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
/* eslint-disable react/prop-types */
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Provider } from 'react-redux';

// components
import Page from '../components/Page';
import createEmotionCache from '../createEmotionCache';
import ErrorBoundaryPage from '../views/ErrorBoundaryPage';

interface Props extends AppProps {
	emotionCache?: EmotionCache;
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const App = ({
	Component,
	pageProps,
	emotionCache = clientSideEmotionCache,
}: Props): JSX.Element => {
	const router = useRouter();

	useEffect(() => {
		const handleRouteChange = (url: URL) => {
			pageview(url);
		};
		router.events.on('routeChangeComplete', handleRouteChange);
		router.events.on('hashChangeComplete', handleRouteChange);
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange);
			router.events.off('hashChangeComplete', handleRouteChange);
		};
	}, [router.events]);

	return (
		<ErrorBoundary
			FallbackComponent={ErrorBoundaryPage}
			onReset={() => window.location.replace('/')}
		>
			<CacheProvider value={emotionCache}>
				<Head>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1, shrink-to-fit=no"
					/>
					<title>Almond | growing your plants smart</title>
				</Head>
				<Provider store={store}>
					<SessionProvider session={pageProps.session}>
						<DefaultSeo
							defaultTitle="Almond Hydroponics"
							titleTemplate="%s • almond"
							description="We design sustainable solutions for hydroponic farmers, empowering them to grow fresh, clean, and local food in their communities around the globe."
						/>
						<Page>
							<Component {...pageProps} />
						</Page>
					</SessionProvider>
				</Provider>
			</CacheProvider>
		</ErrorBoundary>
	);
};

// export default wrapper.withRedux(App);

const getBaseUrl = () => {
	if (typeof window !== 'undefined') {
		return '';
	}

	if (process.env.VERCEL_URL) {
		return `https://${process.env.VERCEL_URL}`;
	}

	return `http://localhost:${process.env.PORT ?? 3000}`;
};

export default withTRPC<AppRouter>({
	config() {
		return {
			links: [
				loggerLink({
					enabled: (opts) =>
						process.env.NODE_ENV === 'development' ||
						(opts.direction === 'down' && opts.result instanceof Error),
				}),
				httpBatchLink({
					url: `${getBaseUrl()}/api/trpc`,
				}),
			],
			transformer,
			queryClientConfig: {
				defaultOptions: {
					queries: {
						retry: (failureCount, error: any) => {
							const trpcErrorCode = error?.data?.code as TRPCError['code'];
							if (trpcErrorCode === 'NOT_FOUND') {
								return false;
							}
							return failureCount < 3;
						},
					},
				},
			},
		};
	},
})(App);
