import prisma from '@lib/prisma';
import { GetServerSideProps } from 'next';
import { getCsrfToken } from 'next-auth/react';
import IndexView from 'views/IndexView';

const IndexPage = ({ csrfToken, posts }): JSX.Element => {
	return <IndexView csrfToken={csrfToken} posts={posts} />;
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
			csrfToken: await getCsrfToken(context),
		},
	};
};
