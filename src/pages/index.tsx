import prisma from '@lib/prisma';
import { GetServerSideProps } from 'next';
import IndexView from 'views/IndexView';

const IndexPage = ({ posts }): JSX.Element => {
	return <IndexView posts={posts} />;
};

export default IndexPage;

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
