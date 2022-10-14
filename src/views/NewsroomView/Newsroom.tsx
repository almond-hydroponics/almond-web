import { Pagination } from '@components/molecules/Pagination';
import { Stack, Typography } from '@mui/material';
import Head from 'next/head';
import { ComponentProps } from 'react';
import { PostFrontMatter } from 'types/PostFrontMatter';

import { MostViewedArticles } from './components';

interface Props {
	posts: PostFrontMatter[];
	title: string;
	initialDisplayPosts?: PostFrontMatter[];
	pagination?: ComponentProps<typeof Pagination>;
}

const Newsroom = ({
	posts,
	initialDisplayPosts,
	pagination,
	title,
}: Props) => {
	return (
		<>
			<Head>
				<title>Almond news</title>
			</Head>

			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				spacing={2}
			>
				<Typography variant="h5" align="left" fontWeight={500}>
					{title}
				</Typography>
			</Stack>

			{posts.length === 0 ? (
				<div>There are no published news to show yet.</div>
			) : (
				<MostViewedArticles posts={posts} />
			)}
		</>
	);
};

export default Newsroom;
