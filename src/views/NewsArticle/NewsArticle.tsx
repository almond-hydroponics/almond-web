import { HtmlView } from '@components/atoms';
import Container from '@components/Container';
import { Main } from '@layouts/index';
import { InferQueryPathAndInput, trpc } from '@lib/trpc';
import { Box, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Hero } from './components';

const components = { Typography };

function getPostQueryPathAndInput(
	id: string
): InferQueryPathAndInput<'news.detail'> {
	return [
		'news.detail',
		{
			id,
		},
	];
}

const NewsArticle = (): JSX.Element => {
	const { data: session } = useSession();
	const router = useRouter();
	const utils = trpc.useContext();
	const postQueryPathAndInput = getPostQueryPathAndInput(
		router.query?.id as string
	);
	const postQuery = trpc.useQuery(postQueryPathAndInput);

	return (
		<>
			<Head>
				<title>{postQuery.data?.title}</title>
			</Head>
			<Main>
				<Box position={'relative'} zIndex={3}>
					<Hero
						avatar={postQuery?.data?.author?.image}
						fullName={postQuery.data?.author?.name}
						date={postQuery.data?.createdAt}
						title={postQuery.data?.title}
						featuredImage={postQuery.data?.thumbnailUrl}
					/>
					<Container maxWidth={{ sm: 720, md: 960 }}>
						<HtmlView html={postQuery?.data?.contentHtml as string} />
					</Container>
				</Box>
			</Main>
		</>
	);
};

export default NewsArticle;
