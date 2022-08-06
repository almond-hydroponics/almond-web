import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from 'components/Container';
import Main from 'layouts/Main';

const NotFound = (): JSX.Element => {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	return (
		<Main>
			<Box
				bgcolor={theme.palette.alternate.main}
				position={'relative'}
				minHeight={'calc(100vh - 247px)'}
				display={'flex'}
				alignItems={'center'}
				justifyContent={'center'}
				height={1}
			>
				<Container>
					<Typography variant="h2" align={'center'} fontWeight={600}>
						Oops!
					</Typography>
					<Typography variant="h2" align={'center'}>
						You broke the internet.
					</Typography>
					<Box marginTop={4} display={'flex'} justifyContent={'center'}>
						<Button
							component={Link}
							variant="contained"
							color="primary"
							size="large"
							href={'/'}
						>
							Return to home
						</Button>
					</Box>
				</Container>
			</Box>
		</Main>
	);
};

export default NotFound;
