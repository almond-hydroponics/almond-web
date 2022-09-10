import { GoogleIcon } from '@components/atoms';
import { Box, Button, Grid, SvgIcon } from '@mui/material';
import { signIn } from 'next-auth/react';

const Form = (): JSX.Element => {
	const handleGoogleLogin = async () => await signIn('google');
	const handleGithubLogin = async () => await signIn('github');

	return (
		<Box>
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<Button
						size="large"
						variant="outlined"
						fullWidth
						startIcon={
							<SvgIcon height={18} width={17}>
								<GoogleIcon />
							</SvgIcon>
						}
						onClick={handleGoogleLogin}
					>
						Continue with Google
					</Button>
				</Grid>
				<Grid item xs={12}>
					<Button
						size="large"
						variant="outlined"
						fullWidth
						startIcon={
							<Box
								component={'img'}
								src={'/img/github-logo.png'}
								alt="github-logo"
								height={22}
								width={22}
							/>
						}
						onClick={handleGithubLogin}
					>
						Continue with Github
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Form;
