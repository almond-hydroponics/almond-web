import { Main } from '@layouts/index';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Container from 'components/Container';

import { FooterNewsletter, Hero, MostViewedArticles } from './components';

export default function BlogNewsroom({ posts }) {
	const theme = useTheme();

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
			<Container maxWidth={{ sm: 720, md: 960 }}>
				<MostViewedArticles posts={posts} />
			</Container>
			{/*<Container maxWidth={800}>*/}
			{/*	<Tags />*/}
			{/*</Container>*/}
			{/*<Container maxWidth={800} paddingY={'0 !important'}>*/}
			{/*	<Divider />*/}
			{/*</Container>*/}
			<Box bgcolor={'alternate.main'}>
				<Container>
					<FooterNewsletter />
				</Container>
			</Box>
		</Main>
	);
}
