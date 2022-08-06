import { ThemeProvider } from '@mui/material/styles';
// react library
import { screen } from '@testing-library/react';
import renderer from 'react-test-renderer';

import getTheme from '../../../theme';
// components
import Logo from './index';

describe.skip('Logo component', () => {
	it('should render correctly', () => {
		const tree = renderer
			.create(
				<ThemeProvider theme={getTheme('light')}>
					<Logo />
				</ThemeProvider>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();

		const elem = screen.getByTestId('logo');
		expect(elem).toHaveClass('makeStyles-logoContainer-1');
	});
});
