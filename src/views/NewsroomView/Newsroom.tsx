import { getQueryPaginationInput } from '@components/molecules/Pagination';
import { InferQueryPathAndInput, trpc } from '@lib/trpc';
import { NextPageWithAuthAndLayout } from '@lib/types';
import { useTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { NewsSummaryProps } from './components/NewsSummary';

const NewsSummary = dynamic<NewsSummaryProps>(
	() => import('./components').then((mod) => mod.NewsSummary),
	{ ssr: false }
);

const POSTS_PER_PAGE = 20;

const Newsroom: NextPageWithAuthAndLayout = () => {
	const theme = useTheme();
	const router = useRouter();
	const currentPageNumber = router.query.page ? Number(router.query.page) : 1;
	const feedQueryPathAndInput: InferQueryPathAndInput<'post.feed'> = [
		'post.feed',
		getQueryPaginationInput(POSTS_PER_PAGE, currentPageNumber),
	];
	const feedQuery = trpc.useQuery(feedQueryPathAndInput);

	if (feedQuery.data) {
		return (
			<>
				<Head>
					<title>Almond news</title>
				</Head>

				{feedQuery.data.postCount === 0 ? (
					<div>There are no published news to show yet.</div>
				) : (
					feedQuery.data.posts.map((post) => (
						<NewsSummary key={post.id} post={post} />
					))
				)}
			</>
		);
	}

	if (feedQuery.isError) {
		return <div>Error: {feedQuery.error.message}</div>;
	}

	return <div>Fetching...</div>;
};

export default Newsroom;
