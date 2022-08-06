import Container from '@components/Container';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { ArrowBack } from '@mui/icons-material';
import { Divider, Stack } from '@mui/material';
import ErrorBoundaryIllustration from '@svg/illustrations/ErrorBoundaryIllustration';

const ErrorBoundaryPage = ({
	error,
	resetErrorBoundary,
}: any): JSX.Element => {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	return (
		<Box
			bgcolor={'#f7f9fc'}
			position={'relative'}
			minHeight={'100vh'}
			display={'flex'}
			alignItems={'center'}
			justifyContent={'center'}
			height={1}
		>
			<Container>
				<Grid container>
					<Grid item container justifyContent={'center'} xs={12} md={6}>
						<Box height={1} width={1} maxWidth={500}>
							<ErrorBoundaryIllustration />
						</Box>
					</Grid>
					<Grid
						item
						container
						alignItems={'center'}
						justifyContent={'center'}
						xs={12}
						md={6}
					>
						<Box>
							<Typography
								variant="h6"
								component="p"
								color="text.secondary"
								align={isMd ? 'left' : 'center'}
							>
								Oops! Seems there is a bug on the page you were viewing. Please
								try reload the application or you can report this to the
								service availability team{' '}
								<Link
									href="mailto:serviceavailability@safaricom.co.ke"
									underline="none"
								>
									here.
								</Link>
							</Typography>
							<Divider sx={{ marginY: 3 }} />
							<Typography component="p" variant="body1">
								Error :
							</Typography>
							<Typography component="p" variant="body1" color="error">
								{error.message}
							</Typography>
							<Box
								marginTop={4}
								display={'flex'}
								justifyContent={{ xs: 'center', md: 'flex-start' }}
							>
								<Button
									variant="contained"
									color="primary"
									// size="large"
									startIcon={<ArrowBack />}
									onClick={resetErrorBoundary}
								>
									Go back
								</Button>
							</Box>
						</Box>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default ErrorBoundaryPage;
