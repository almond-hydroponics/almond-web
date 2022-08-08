import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from 'components/Container';
import Main from 'layouts/Main';
import Link from 'next/link';

const ServerError = (): JSX.Element => {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	return (
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
					<Typography variant="h2" align={'center'} fontWeight={600}>
						Oops!
					</Typography>
					<Typography variant="h2" align={'center'}>
						This is our fault.
					</Typography>
					<Box marginTop={4} display={'flex'} justifyContent={'center'}>
						<Link href="/" passHref>
							<Button variant="contained" color="primary" size="large">
								Return to home
							</Button>
						</Link>
					</Box>
				</Container>
			</Box>
		</Main>
	);
};

export default ServerError;
