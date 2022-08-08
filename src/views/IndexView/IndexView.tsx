import { ComponentContext } from '@context/ComponentContext';
import Box from '@mui/material/Box';
import { alpha, useTheme } from '@mui/material/styles';
import Container from 'components/Container';
import Main from 'layouts/Main';
import { useContext, useEffect } from 'react';

import { Features, Hero, Places, Services } from './components';

interface Props {
	csrfToken: string;
	// posts: any;
}

const IndexView = ({ csrfToken }: Props): JSX.Element => {
	const theme = useTheme();
	const { setCsrfToken } = useContext(ComponentContext);

	useEffect(() => {
		if (csrfToken !== '' || undefined) {
			setCsrfToken(csrfToken);
		}
	}, []);

	return (
		<Main>
			<Box
				bgcolor={'alternate.main'}
				sx={{
					position: 'relative',
					'&::after': {
						position: 'absolute',
						content: '""',
						width: '30%',
						zIndex: 1,
						top: 0,
						left: '5%',
						height: '100%',
						backgroundSize: '16px 16px',
						backgroundImage: `radial-gradient(${alpha(
							theme.palette.primary.dark,
							0.4
						)} 20%, transparent 20%)`,
						opacity: 0.2,
					},
				}}
			>
				<Box position={'relative'} zIndex={3}>
					<Hero />
				</Box>
			</Box>
			<Container>
				<Services />
			</Container>
			<Box
				sx={{
					backgroundImage: `linear-gradient(to bottom, ${alpha(
						theme.palette.background.paper,
						0
					)}, ${alpha(theme.palette.alternate.main, 1)} 100%)`,
					backgroundRepeat: 'repeat-x',
					position: 'relative',
				}}
			>
				{/*<Container>*/}
				{/*	<QuickStart />*/}
				{/*</Container>*/}
				<Container>
					<Features />
				</Container>
				<Container>
					<Places />
				</Container>
			</Box>
			{/*<Container>*/}
			{/*	<GetStarted />*/}
			{/*</Container>*/}
			{/*<Box>*/}
			{/*	<Container>*/}
			{/*		<News posts={posts} />*/}
			{/*	</Container>*/}
			{/*</Box>*/}
		</Main>
	);
};

export default IndexView;
