import Box from '@mui/material/Box';
import { alpha, useTheme } from '@mui/material/styles';
import Container from 'components/Container';
import Main from 'layouts/Main';

import { FooterNewsletter, Hero, MostViewedArticles } from './components';

export default function BlogNewsroom({ posts }) {
	const theme = useTheme();

	return (
		<Main colorInvert={true}>
			<Hero />
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
