import { GoogleIcon } from '@components/atoms';
import { FormInputText } from '@components/molecules';
import { ComponentContext } from '@context/ComponentContext';
import { yupResolver } from '@hookform/resolvers/yup';
import {
	AlternateEmailTwoTone,
	EmailRounded,
	Visibility,
	VisibilityOff,
} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid, InputAdornment, SvgIcon } from '@mui/material';
import { AppDispatch } from '@store/index';
import { displaySnackMessage } from '@store/slices/snack';
import { SignInResponse, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

interface Props {
	handleAuthModal: () => void;
	handleAuthByEmail: () => void;
	authByEmail: boolean;
}

const schema = yup
	.object({
		email: yup
			.string()
			.email('Invalid email format')
			.required('Email is required'),
		password: yup.string().required('Password is required'),
	})
	.required();

type IFormInput = {
	email: string;
	password: string;
};

const Form = ({
	handleAuthModal,
	handleAuthByEmail,
	authByEmail,
}: Props): JSX.Element => {
	const dispatch: AppDispatch = useDispatch();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [isPasswordHidden, showPassword] = useState<boolean>(false);
	const togglePassword = () => showPassword((prevState) => !prevState);
	const { csrfToken } = useContext(ComponentContext);
	const { replace } = useRouter();

	// const { data } = useQuery(GetGoogleAuthUrlDocument);

	const { handleSubmit, control, reset } = useForm<IFormInput>({
		resolver: yupResolver(schema),
		mode: 'onChange',
	});

	const onSubmit = async ({ email, password }) => {
		try {
			setIsLoading(true);
			// @ts-expect-error
			const response: SignInResponse = await signIn('credentials', {
				email,
				password,
				redirect: false,
			});

			if (response?.error !== '') {
				setError(response?.error as string);
				dispatch(
					displaySnackMessage({ message: error as string, severity: 'error' })
				);
			} else {
				setError(null);
				dispatch(
					displaySnackMessage({
						message: 'You have successfully logged in',
					})
				);
			}
		} catch (e) {
			setError(e as string);
			dispatch(
				displaySnackMessage({
					message: error as string,
					severity: 'error',
				})
			);
		} finally {
			handleAuthModal();
			setIsLoading(false);
		}
	};

	const handleGoogleLogin = async () => await signIn('google');

	const renderContinueWithEmail = (): JSX.Element => (
		<form name="email-login" onSubmit={handleSubmit(onSubmit)}>
			<input name="csrfToken" type="hidden" defaultValue={csrfToken} />
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<FormInputText
						name="email"
						margin="dense"
						size="medium"
						control={control}
						label="Email"
						type="text"
						placeholder="blah@blah.com"
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<AlternateEmailTwoTone />
								</InputAdornment>
							),
						}}
					/>
				</Grid>

				<Grid item xs={12}>
					<FormInputText
						name="password"
						margin="dense"
						size="medium"
						control={control}
						label="Password"
						type={isPasswordHidden ? 'text' : 'password'}
						placeholder="Blah123$"
						InputProps={{
							endAdornment: (
								<InputAdornment
									style={{ cursor: 'pointer' }}
									onClick={togglePassword}
									position="end"
								>
									{isPasswordHidden ? <Visibility /> : <VisibilityOff />}
								</InputAdornment>
							),
						}}
					/>
				</Grid>

				<Grid item container xs={12}>
					<Box
						display="flex"
						flexDirection={{ xs: 'column', sm: 'row' }}
						alignItems={{ xs: 'stretched', sm: 'center' }}
						justifyContent={'space-between'}
						width={1}
						maxWidth={600}
						margin={'0 auto'}
					>
						<LoadingButton
							autoFocus
							fullWidth
							variant="contained"
							type="submit"
							color="primary"
							size="large"
							// disabled={!isValid}
							loading={isLoading}
							loadingIndicator="Please wait..."
						>
							Login
						</LoadingButton>
					</Box>
				</Grid>
			</Grid>
		</form>
	);

	const renderAuthOptions = () => (
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
					startIcon={<EmailRounded />}
					onClick={handleAuthByEmail}
				>
					Continue with Email
				</Button>
			</Grid>
		</Grid>
	);

	return (
		<Box>{authByEmail ? renderContinueWithEmail() : renderAuthOptions()}</Box>
	);
};

export default Form;
