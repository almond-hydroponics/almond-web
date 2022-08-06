import IndexView from 'views/IndexView';
import { GetServerSideProps } from 'next';
import { getCsrfToken } from 'next-auth/react';

const IndexPage = ({ csrfToken }): JSX.Element => {
	return <IndexView csrfToken={csrfToken} />;
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
	return {
		props: {
			csrfToken: await getCsrfToken(context),
		},
	};
};
