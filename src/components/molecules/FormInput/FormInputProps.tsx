import { ReactElement, ReactNode } from 'react';

export interface FormInputProps {
	name: string;
	control: any;
	label: string;
	setValue?: any;
	Icon?: ReactNode | ReactElement;
	iconPosition?: 'start' | 'end';

	[x: string]: any;
}
