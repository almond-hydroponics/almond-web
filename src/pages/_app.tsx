// styles
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'aos/dist/aos.css';
import 'assets/css/index.css';
import 'assets/css/fonts.css';

import { ApolloProvider } from '@apollo/client';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { useApollo } from '@lib/apollo';
import { wrapper } from '@store/index';
import { GoogleAnalytics } from '@utils/googleAnalytics';
import { SessionProvider } from 'next-auth/react';
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
/* eslint-disable react/prop-types */
import Head from 'next/head';

// components
import Page from '../components/Page';
import createEmotionCache from '../createEmotionCache';

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
	GoogleAnalytics.useTracker();

	const apolloClient = useApollo(pageProps.initialApolloState);

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no"
				/>
				<title>Almond | growing your plants smart</title>
			</Head>
			<ApolloProvider client={apolloClient}>
				<SessionProvider session={pageProps.session}>
					<DefaultSeo
						defaultTitle="almond"
						titleTemplate="%s • almond"
						description="Almond Hydroponics - Growing your plants smart"
					/>
					<Page>
						<Component {...pageProps} />
					</Page>
				</SessionProvider>
			</ApolloProvider>
		</CacheProvider>
	);
};

export default wrapper.withRedux(App);
