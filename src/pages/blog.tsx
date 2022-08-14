import prisma from '@lib/prisma';
import { GetStaticProps } from 'next';
import BlogNewsroom from 'views/BlogNewsroom';

export default function BlogNewsroomPage({ posts }): JSX.Element {
	return <BlogNewsroom posts={posts} />;
}

export const getStaticProps: GetStaticProps = async () => {
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
