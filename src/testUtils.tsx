import { StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import store from '@store/index';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import getTheme from './theme';

jest.mock('next-auth/react', () => {
	const originalModule = jest.requireActual('next-auth/react');
	const mockSession = {
		expires: new Date(Date.now() + 2 * 86400).toISOString(),
		user: { username: 'admin', userRoles: ['Admin', 'User'] },
	};
	return {
		__esModule: true,
		...originalModule,
		useSession: jest.fn(() => {
			return { data: mockSession, status: 'authenticated' };
		}),
	};
});

const theme = getTheme('light');

const ReduxProvider = ({ children, reduxStore }) => (
	<Provider store={reduxStore}>{children}</Provider>
);

// Add in any providers here if necessary:
const Providers = ({ children }) => {
	return (
		<ReduxProvider reduxStore={store}>
			<StyledEngineProvider injectFirst>
				<ThemeProvider theme={theme}>{children}</ThemeProvider>
			</StyledEngineProvider>
		</ReduxProvider>
	);
};

const customRender = (ui, options = {}) =>
	render(ui, { wrapper: Providers, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
