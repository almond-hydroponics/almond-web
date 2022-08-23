import { ComponentContext } from '@context/ComponentContext';
import { useContext } from 'react';

import AdminAnalytics from './AdminAnalytics';
import RegularUserAnalytics from './RegularUserAnalytics';

export const AnalyticsView = (): JSX.Element => {
	const { currentRoleBasedAccess, isAdmin } = useContext(ComponentContext);

	const dashboardView = {
		USER: <RegularUserAnalytics />,
		ADMIN: isAdmin ? <AdminAnalytics /> : <RegularUserAnalytics />,
		DEVELOPER: <RegularUserAnalytics />,
	};

	return dashboardView[currentRoleBasedAccess];
};

export default AnalyticsView;
