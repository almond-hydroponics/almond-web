/* eslint-disable react/prop-types */
import Head from 'next/head';
import { AppProps } from 'next/app';
import { EmotionCache } from '@emotion/utils';
import { CacheProvider } from '@emotion/react';
import { wrapper } from '@lib/store';
// components
import Page from '../components/Page';
import createEmotionCache from '../createEmotionCache';
import { DefaultSeo } from 'next-seo';
import { SessionProvider } from 'next-auth/react';
import { GoogleAnalytics } from '@utils/googleAnalytics';
// styles
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'aos/dist/aos.css';
import 'assets/css/index.css';
import 'assets/css/fonts.css';

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

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no"
				/>
				<title>almond | growing your plants smart</title>
			</Head>
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
		</CacheProvider>
	);
};

export default wrapper.withRedux(App);
