import { Role } from '@prisma/client';
import { useSession } from 'next-auth/react';

import AdminAnalytics from './AdminAnalytics';
import RegularUserAnalytics from './RegularUserAnalytics';

export const AnalyticsView = (): JSX.Element => {
	const { data: session } = useSession();
	const role = session?.user?.role as Role;

	return role === 'ADMIN' ? <AdminAnalytics /> : <RegularUserAnalytics />;
};

export default AnalyticsView;
