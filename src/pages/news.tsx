import { Link } from '@components/atoms';
import Container from '@components/Container';
import { Main } from '@layouts/index';
import { NextPageWithAuthAndLayout } from '@lib/types';
import { Add } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';
import { ReactElement } from 'react';
import NewsroomView from 'views/NewsroomView';

const NewsroomPage: NextPageWithAuthAndLayout = (): JSX.Element => {
	return <NewsroomView />;
};

NewsroomPage.auth = false;

NewsroomPage.getLayout = function getLayout(page: ReactElement) {
	return (
		<Main>
			{/*{page}*/}
			{/*<Box*/}
			{/*	sx={{*/}
			{/*		position: 'relative',*/}
			{/*		backgroundImage: 'url("/img/hydroponics.webp")',*/}
			{/*		backgroundSize: 'cover',*/}
			{/*		backgroundPosition: 'center',*/}
			{/*		'&:after': {*/}
			{/*			position: 'absolute',*/}
			{/*			content: '" "',*/}
			{/*			width: '100%',*/}
			{/*			height: '100%',*/}
			{/*			top: 0,*/}
			{/*			right: 0,*/}
			{/*			bottom: 0,*/}
			{/*			left: 0,*/}
			{/*			zIndex: 1,*/}
			{/*			background: '#161c2d',*/}
			{/*			opacity: 0.6,*/}
			{/*		},*/}
			{/*	}}*/}
			{/*>*/}
			{/*	<Box position={'relative'} zIndex={3}>*/}
			{/*		<Hero />*/}
			{/*	</Box>*/}
			{/*</Box>*/}
			<Container
				maxWidth={{ sm: 720, md: 960 }}
				paddingY={{ xs: 4, sm: 6, md: 2 }}
			>
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center"
					spacing={2}
				>
					<Typography variant="h5" align="left" fontWeight={500}>
						Latest news
					</Typography>
					<Button
						variant="outlined"
						component={Link}
						href={'/new-post'}
						startIcon={<Add />}
					>
						Add post
					</Button>
				</Stack>
				{page}
			</Container>
			{/*<Box*/}
			{/*	component={Grid}*/}
			{/*	container*/}
			{/*	spacing={4}*/}
			{/*	flexDirection={{ xs: 'column-reverse', md: 'row' }}*/}
			{/*>*/}
			{/*	<Grid item xs={12} md={3}>*/}
			{/*		<Box*/}
			{/*			position={'sticky'}*/}
			{/*			top={theme.spacing(10)}*/}
			{/*			className={'sticky'}*/}
			{/*		>*/}
			{/*			<ContactCard />*/}
			{/*		</Box>*/}
			{/*	</Grid>*/}
			{/*	<Grid item xs={12}>*/}
			{/*		<Container maxWidth={{ sm: 720, md: 960 }}>{page}</Container>*/}
			{/*	</Grid>*/}
			{/*</Box>*/}
			{/*<Box bgcolor={'alternate.main'}>*/}
			{/*	<Container>*/}
			{/*		<FooterNewsletter />*/}
			{/*	</Container>*/}
			{/*</Box>*/}
		</Main>
	);
};

export default NewsroomPage;

// export const getStaticProps: GetStaticProps = async () => {
// 	const posts = await prisma.post.findMany({
// 		where: { published: true },
// 		include: {
// 			author: true,
// 		},
// 	});
//
// 	return {
// 		props: {
// 			posts: JSON.parse(JSON.stringify(posts)),
// 		},
// 	};
// };
