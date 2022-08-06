import { useState, useEffect, createContext, useMemo, ReactNode } from 'react';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import getTheme from 'theme';
import AOS from 'aos';
import { ComponentProvider } from '@context/ComponentContext';
import ErrorBoundaryPage from '../views/ErrorBoundaryPage';
import { ErrorBoundary } from '@components/molecules/ErrorBoundary';
import { useSelector } from 'react-redux';
import SnackBar from '@components/atoms/SnackBar';
import { OurStore } from '@lib/store';
import { useSession } from 'next-auth/react';
import useDarkMode from '@hooks/useDarkMode';

interface Props {
	children: ReactNode;
}

const Page = ({ children }: Props): JSX.Element => {
	const { data: session } = useSession();

	const snack = useSelector((store: OurStore) => store.snack);

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

	const [themeMode, themeToggler, mountedComponent] = useDarkMode();

	useEffect(() => {
		AOS.refresh();
	}, [mountedComponent, themeMode]);

	return (
		<ThemeProvider theme={getTheme(themeMode, themeToggler)}>
			<ErrorBoundary
				FallbackComponent={ErrorBoundaryPage}
				onReset={() => window.location.replace('/')}
			>
				<ComponentProvider>
					{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
					<CssBaseline />
					<Paper elevation={0}>{children}</Paper>
					<SnackBar snack={snack} />
				</ComponentProvider>
			</ErrorBoundary>
		</ThemeProvider>
	);
};

export default Page;
