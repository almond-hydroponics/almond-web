import { ReactNode } from 'react';

type color =
	| 'blueCard'
	| 'yellowCard'
	| 'purpleCard'
	| 'tealCard'
	| 'greenCard'
	| 'brownCard';

export interface AnalyticsCardProps {
	icon?: ReactNode;
	mainInfo: string;
	subInfo: string | number | ReactNode;
	colorClass?: color;
	onClick?: () => void;
}
