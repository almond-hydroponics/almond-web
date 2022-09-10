import { Link } from '@components/atoms';
import { getQueryPaginationInput } from '@components/molecules/Pagination';
import { InferQueryPathAndInput, trpc } from '@lib/trpc';
import { Add } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { MostViewedArticles } from './components';

const POSTS_PER_PAGE = 20;

const Newsroom = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const currentPageNumber = router.query.page ? Number(router.query.page) : 1;
	const feedQueryPathAndInput: InferQueryPathAndInput<'news.feed'> = [
		'news.feed',
		getQueryPaginationInput(POSTS_PER_PAGE, currentPageNumber),
	];
	const feedQuery = trpc.useQuery(feedQueryPathAndInput);

	const isUserAdmin = session?.user.role === 'ADMIN';

	if (feedQuery.data) {
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
						Latest news
					</Typography>
					{!!session && isUserAdmin ? (
						<Button
							size="small"
							variant="outlined"
							component={Link}
							href={'/new-post'}
							startIcon={<Add />}
						>
							Add post
						</Button>
					) : null}
				</Stack>

				{feedQuery.data.postCount === 0 ? (
					<div>There are no published news to show yet.</div>
				) : (
					<MostViewedArticles posts={feedQuery.data.posts} />
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
