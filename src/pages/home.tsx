import prisma from '@lib/prisma';
import { GetServerSideProps } from 'next';
import IndexView from 'views/HomeView';

interface Props {
	posts: any;
}

const HomePage = ({ posts }: Props): JSX.Element => {
	return <IndexView posts={posts} />;
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const posts = await prisma.post.findMany({
		where: { published: true },
		include: {
			author: true,
		},
	});

	return {
		props: {
			posts: JSON.parse(JSON.stringify(posts)),
		},
	};
};
