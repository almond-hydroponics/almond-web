// react libraries
import ReactGA from 'react-ga';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const TRACKING_ID = process.env.NEXT_GOOGLE_TRACKING_ID as string;

export namespace GoogleAnalytics {
	export const initializeGA = (): void => {
		if (TRACKING_ID) {
			ReactGA.initialize(TRACKING_ID, {
				testMode: process.env.NODE_ENV === 'test',
			});
		}
	};

	export const logPageView = () => {
		if (TRACKING_ID) {
			ReactGA.set({ page: window.location.pathname });
			ReactGA.pageview(window.location.pathname + window.location.search);
		}
	};

	export const logEvent = (category = '', action = '') => {
		if (category && action) {
			ReactGA.event({ category, action });
		}
	};

	export const logException = (description = '', fatal = false) => {
		if (description) {
			ReactGA.exception({ description, fatal });
		}
	};

	export function useTracker() {
		const { events, asPath } = useRouter();

		useEffect(() => {
			initializeGA();
			// `routeChangeComplete` won't run for the first page load unless the query string is
			// hydrated later on, so here we log a page view if this is the first render and
			// there's no query string
			if (!asPath.includes('?')) {
				logPageView();
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []);

		useEffect(() => {
			// Listen for page changes after a navigation or when the query changes
			events.on('routeChangeComplete', logPageView);

			return () => {
				events.off('routeChangeComplete', logPageView);
			};
		}, [events]);
	}
}
