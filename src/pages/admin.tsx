import { NextPageWithAuthAndLayout } from '@/lib/types';
import AdminView from '@/views/AdminView';

const AdminPage: NextPageWithAuthAndLayout = (): JSX.Element => {
	return <AdminView />;
};

AdminPage.auth = true;

export default AdminPage;
