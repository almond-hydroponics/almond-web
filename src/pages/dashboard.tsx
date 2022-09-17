import { NextPageWithAuthAndLayout } from '@lib/types';
import DashboardView from 'views/DashboardView';

const DashboardPage: NextPageWithAuthAndLayout = (): JSX.Element => {
	return <DashboardView />;
};

DashboardPage.auth = true;

export default DashboardPage;
