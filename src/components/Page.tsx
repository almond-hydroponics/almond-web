import SnackBar from '@/components/atoms/SnackBar';
import { ErrorBoundary } from '@/components/molecules/ErrorBoundary';
import { ComponentProvider } from '@/context/ComponentContext';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import { ThemeProvider } from '@mui/material/styles';
import AOS from 'aos';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ErrorBoundaryPage from '../views/ErrorBoundaryPage';
import { RootState } from '@/store';
import getTheme from '@/theme';

export const ColorModeContext = createContext({
	toggleColorMode: () => {},
});

interface Props {
	children: ReactNode;
}

const Page = ({ children }: Props): JSX.Element => {
	const [mode, setMode] = useState<'light' | 'dark'>('light');

	const dispatch = useDispatch();
	const { push, pathname } = useRouter();
	const { status, data: session } = useSession();

	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement?.removeChild(jssStyles);
		}

		AOS.init({
			once: true,
			delay: 50,
			duration: 500,
			easing: 'ease-in-out',
		});
	}, []);

	// useEffect(() => {
	// 	if (session?.error === 'RefreshAccessTokenError') {
	// 		// Force sign in to hopefully resolve error
	// 		signIn().then(() =>
	// 			dispatch(
	// 				displaySnackMessage({
	// 					message: 'Your token has expired. Kindly login to continue.',
	// 				})
	// 			)
	// 		);
	// 	}
	// }, [session]);

	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
			},
		}),
		[]
	);

	const theme = useMemo(() => getTheme(mode as PaletteMode), [mode]);
	const snack = useSelector((store: RootState) => store.snack);

	return (
		<ThemeProvider theme={theme}>
			{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
			<CssBaseline />
			<ColorModeContext.Provider value={colorMode}>
				<ErrorBoundary
					FallbackComponent={ErrorBoundaryPage}
					onReset={() => window.location.replace('/')}
				>
					<ComponentProvider>
						<Paper elevation={0}>{children}</Paper>
						<SnackBar snack={snack} />
					</ComponentProvider>
				</ErrorBoundary>
			</ColorModeContext.Provider>
		</ThemeProvider>
	);
};

export default Page;
