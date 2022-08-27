import Container from '@components/Container';
import { Main } from '@layouts/index';
import Box from '@mui/material/Box';
import { ReactElement } from 'react';
import NewsroomView from 'views/NewsroomView';

import { FooterNewsletter, Hero } from '../views/NewsroomView/components';

export default function NewsroomPage(): JSX.Element {
	return <NewsroomView />;
}

NewsroomPage.getLayout = function getLayout(page: ReactElement) {
	return (
		<Main>
			<Box
				sx={{
					position: 'relative',
					backgroundImage: 'url("/img/hydroponics.webp")',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					'&:after': {
						position: 'absolute',
						content: '" "',
						width: '100%',
						height: '100%',
						top: 0,
						right: 0,
						bottom: 0,
						left: 0,
						zIndex: 1,
						background: '#161c2d',
						opacity: 0.6,
					},
				}}
			>
				<Box position={'relative'} zIndex={3}>
					<Hero />
				</Box>
			</Box>
			<Container maxWidth={{ sm: 720, md: 960 }}>{page}</Container>
			<Box bgcolor={'alternate.main'}>
				<Container>
					<FooterNewsletter />
				</Container>
			</Box>
		</Main>
	);
};

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
