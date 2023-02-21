import { PageSEO } from '@/components/atoms/SEO';
import Container from '@/components/Container';
import { Main } from '@/layouts/index';
import { getAllFilesFrontMatter } from '@/lib/mdx';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { ComponentProps, ReactElement } from 'react';
import NewsroomView from '@/views/NewsroomView';
import Newsroom from '@/views/NewsroomView';

import siteMetadata from '../../data/siteMetadata';
import { POSTS_PER_PAGE } from '@/config';

export const getStaticProps: GetStaticProps<{
	posts: ComponentProps<typeof Newsroom>['posts'];
	initialDisplayPosts: ComponentProps<typeof Newsroom>['initialDisplayPosts'];
	pagination: ComponentProps<typeof Newsroom>['pagination'];
}> = async () => {
	const posts = await getAllFilesFrontMatter('posts');
	const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE);
	const pagination = {
		currentPage: 1,
		totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
	};

	return { props: { initialDisplayPosts, posts, pagination } };
};

const NewsroomPage = ({
	posts,
	initialDisplayPosts,
	pagination,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
	return (
		<NewsroomView
			posts={posts}
			initialDisplayPosts={initialDisplayPosts}
			pagination={pagination}
			title="Latest news"
		/>
	);
};

NewsroomPage.getLayout = function getLayout(page: ReactElement) {
	return (
		<>
			<PageSEO
				title={`Post - ${siteMetadata.author}`}
				description={siteMetadata.description}
			/>
			<Main>
				<Container
					maxWidth={{ sm: 720, md: 960 }}
					paddingY={{ xs: 4, sm: 6, md: 2 }}
				>
					{page}
				</Container>
			</Main>
		</>
	);
};

export default NewsroomPage;
