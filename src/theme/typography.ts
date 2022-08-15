import { ThemeOptions } from '@mui/material/styles';
import { CSSProperties } from 'react';

type Func = () => NonNullable<ThemeOptions['typography']>;

/**
 * Customized Material UI typography.
 *
 * @see https://mui.com/customization/typography/
 * @see https://mui.com/customization/default-theme/?expand-path=$.typography
 */
const createTypography: Func = () => ({
	fontFamily: [`CircularStd`, `Helvetica`, `Arial`, `sans-serif`].join(','),
	// fontFamily:
	// 	'SF Pro Text,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif;',
	fontSynthesis: 'weight style',
	fontSize: 16,
	lineHeight: 1.52947,
	// h1: {
	// 	fontSize: '2.5rem',
	// },
	// h2: {
	// 	fontSize: '2rem',
	// },
	// h3: {
	// 	fontSize: '1.75rem',
	// },
	// h4: {
	// 	fontSize: '1.5rem',
	// },
	// h5: {
	// 	fontSize: '1.25rem',
	// },
	// h6: {
	// 	fontSize: '1rem',
	// },
	button: {
		textTransform: 'none',
		fontWeight: 'medium' as CSSProperties['fontWeight'],
	},
});

export { createTypography };
