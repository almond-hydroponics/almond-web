import { GetServerSideProps } from 'next';
import IndexView from '@/views/HomeView';

interface Props {
	posts: any;
}

const HomePage = ({ posts }: Props): JSX.Element => {
	return <IndexView posts={posts} />;
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
	return {
		props: {
			posts: [],
		},
	};
};
