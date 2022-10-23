// styles
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'aos/dist/aos.css';
import 'assets/css/index.css';
import 'assets/css/fonts.css';
import 'assets/css/prism.css';
import 'katex/dist/katex.css';

import Auth from '@components/Auth';
import { ErrorBoundary } from '@components/molecules/ErrorBoundary';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { trpc } from '@lib/trpc';
import { NextPageWithAuthAndLayout } from '@lib/types';
import store from '@store/index';
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
	Component: NextPageWithAuthAndLayout;
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const App = ({
	Component,
	pageProps: { session, ...pageProps },
	emotionCache = clientSideEmotionCache,
}: Props): JSX.Element => {
	const router = useRouter();
	const getLayout = Component.getLayout ?? ((page) => page);

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
					<SessionProvider session={session} refetchOnWindowFocus={false}>
						<DefaultSeo
							defaultTitle="Almond Hydroponics"
							titleTemplate="%s • almond"
							description="We design sustainable solutions for hydroponic farmers, empowering them to grow fresh, clean, and local food in their communities around the globe."
						/>
						<Page>
							{Component.auth ? (
								<Auth>{getLayout(<Component {...pageProps} />)}</Auth>
							) : (
								getLayout(<Component {...pageProps} />)
							)}
						</Page>
					</SessionProvider>
				</Provider>
			</CacheProvider>
		</ErrorBoundary>
	);
};

const getBaseUrl = () => {
	if (typeof window !== 'undefined')
		// browser should use relative path
		return '';

	if (process.env.VERCEL_URL)
		// reference for vercel.com
		return `https://${process.env.VERCEL_URL}`;

	if (process.env.RENDER_INTERNAL_HOSTNAME)
		// reference for render.com
		return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;

	// assume localhost
	return `http://localhost:${process.env.PORT ?? 3000}`;
};

export default trpc.withTRPC(App);
