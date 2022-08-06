import { defaultProperties } from '@components/atoms/DarkModeToggler/DarkModeToggler';
import { CSSProperties, HTMLAttributes } from 'react';

type SVGProps = Omit<HTMLAttributes<HTMLOrSVGElement>, 'onChange'>;
export interface DarkModeTogglerProps extends SVGProps {
	/**
	 * External classes
	 */
	className?: string;
	/**
	 * Color of the icon
	 */
	fontIconColor?: string;

	style?: CSSProperties;
	size?: number;
	animationProperties?: typeof defaultProperties;
	moonColor?: string;
	sunColor?: string;

	// All other props
	[x: string]: any;
}
