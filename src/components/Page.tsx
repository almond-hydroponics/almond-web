import SnackBar from '@components/atoms/SnackBar';
import { ErrorBoundary } from '@components/molecules/ErrorBoundary';
import { ComponentProvider } from '@context/ComponentContext';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import { ThemeProvider } from '@mui/material/styles';
import { RootState } from '@store/index';
import AOS from 'aos';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ReactNode, createContext, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import getTheme from 'theme';

import ErrorBoundaryPage from '../views/ErrorBoundaryPage';

export const ColorModeContext = createContext({
	toggleColorMode: () => {},
});

interface Props {
	children: ReactNode;
}

const Page = ({ children }: Props): JSX.Element => {
	const [mode, setMode] = useState<'light' | 'dark'>('light');

	const { push, pathname } = useRouter();
	const { status } = useSession();

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

	const routerPaths = ['/setup-device', '/dashboard', '/settings'];

	useEffect(() => {
		if (status === 'unauthenticated' && routerPaths.includes(pathname)) {
			push('/');
		}
	}, [status, pathname]);

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
