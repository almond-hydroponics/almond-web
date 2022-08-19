import { GoogleIcon } from '@components/atoms';
import Container from '@components/Container';
import { authOptions } from '@lib/auth';
import { Button, Grid, SvgIcon } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { getProviders, signIn } from 'next-auth/react';
import Head from 'next/head';

import { Minimal } from '../layouts';

const Login = ({
	providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	const buttonIcon = {
		google: (
			<SvgIcon height={18} width={17}>
				<GoogleIcon />
			</SvgIcon>
		),
		github: (
			<Box
				component={'img'}
				src={'/img/github-logo.png'}
				alt="github-logo"
				height={22}
				width={22}
			/>
		),
	};

	return (
		<>
			<Head>
				<title>Sign In - Almond</title>
			</Head>
			<Minimal>
				<Box
					bgcolor={theme.palette.alternate.main}
					position={'relative'}
					minHeight={`calc(100vh - ${isMd ? '247px - 56px' : '300px - 63px'})`}
					display={'flex'}
					alignItems={'center'}
					justifyContent={'center'}
					height={'100%'}
				>
					<Container maxWidth={400}>
						<Grid container spacing={4}>
							{Object.values(providers!).map((provider) => (
								<Grid key={provider.id} item xs={12}>
									<Button
										size="large"
										variant="outlined"
										fullWidth
										startIcon={buttonIcon[provider.id]}
										onClick={() => signIn(provider.id)}
									>
										Sign in with {provider.name}
									</Button>
								</Grid>
							))}
						</Grid>
					</Container>
				</Box>
			</Minimal>
		</>
	);
};

export const getServerSideProps = async ({
	req,
	res,
}: GetServerSidePropsContext) => {
	const session = await unstable_getServerSession(req, res, authOptions);
	const providers = await getProviders();

	if (session?.user) {
		return {
			redirect: {
				permanent: false,
				destination: '/',
			},
			props: { providers },
		};
	}

	return {
		props: { providers },
	};
};

export default Login;
