import { Link } from '@/components/atoms';
import { Main } from '@/layouts/index';
import { Replay } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@/components/Container';
import Head from 'next/head';

const NotFound = (): JSX.Element => {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	return (
		<>
			<Head>
				<title>Almond Offline</title>
			</Head>
			<Main>
				<Box
					bgcolor={theme.palette.alternate.main}
					position={'relative'}
					minHeight={`calc(100vh - ${isMd ? '247px - 56px' : '300px - 63px'})`}
					display={'flex'}
					alignItems={'center'}
					justifyContent={'center'}
					height={'100%'}
				>
					<Container>
						<Typography variant="h2" align="center" fontWeight={600}>
							You are offline!
						</Typography>
						<Typography variant="h3" align="center">
							Reconnect to the internet and try again
						</Typography>
						<Box marginTop={4} display={'flex'} justifyContent="center">
							<Button
								component={Link}
								href={'/'}
								variant="contained"
								color="primary"
								size="large"
								startIcon={<Replay />}
							>
								Try again
							</Button>
						</Box>
					</Container>
				</Box>
			</Main>
		</>
	);
};

export default NotFound;
