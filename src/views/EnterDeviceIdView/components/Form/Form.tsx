import { yupResolver } from '@hookform/resolvers/yup';
import { trpc } from '@lib/trpc';
import { AllOut } from '@mui/icons-material';
import { Button, Grid, InputAdornment, TextField } from '@mui/material';
import { displaySnackMessage } from '@store/slices/snack';
import { forwardRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

const schema = yup
	.object({
		identifier: yup
			.string()
			.required('Device ID is required for you to proceed')
			.min(9, 'Device ID should be 8 characters. Kindly confirm.'),
	})
	.required();

type IFormInput = {
	identifier: string;
};

const defaultValues = {
	identifier: '',
};

interface CustomProps {
	onChange: (event: { target: { identifier: string; value: string } }) => void;
	identifier: string;
}

const TextMaskCustom = forwardRef<HTMLElement, CustomProps>(
	function TextMaskCustom(props, ref) {
		const { onChange, ...other } = props;
		return (
			<IMaskInput
				{...other}
				mask="**** ****"
				// @ts-expect-error Ref is allowed for now
				inputRef={ref}
				onAccept={(value: unknown) =>
					onChange({
						target: {
							identifier: props.identifier,
							value: String(value).toUpperCase(),
						},
					})
				}
				overwrite
			/>
		);
	}
);

interface FormProps {
	handleNext?: () => void;
}

const Form = ({ handleNext }: FormProps): JSX.Element => {
	const dispatch = useDispatch();
	const verifyDeviceMutation = trpc.useMutation('device.verify', {
		onError: (error) => {
			dispatch(
				displaySnackMessage({
					message: error.message,
					severity: 'error',
				})
			);
		},
		onSuccess: (data) => {
			dispatch(
				displaySnackMessage({
					message: `Your device ID ${data?.identifier} has been successfully verified`,
				})
			);

			setTimeout(() => {
				if (location.pathname === '/setup-device' && handleNext) {
					handleNext();
				}
			}, 2000);
		},
	});

	const activateDeviceMutation = trpc.useMutation('device.activate', {
		onError: (error) => {
			dispatch(
				displaySnackMessage({
					message: error.message,
					severity: 'error',
				})
			);
		},
	});

	const {
		handleSubmit,
		control,
		formState: { isValid },
	} = useForm<IFormInput>({
		defaultValues: defaultValues,
		resolver: yupResolver(schema),
		mode: 'onChange',
	});

	const onSubmit: SubmitHandler<IFormInput> = ({ identifier }) => {
		verifyDeviceMutation.mutate({
			identifier: identifier.split(' ').join(''),
		});

		if (location.pathname === '/setup-device') {
			activateDeviceMutation.mutate({
				id: identifier.split(' ').join(''),
			});
		}
	};

	// const onSubmit = (e) => {
	// 	handleSubmit(e);
	// 	if (!device?.errors) return;
	// 	if (location.pathname === '/my-device') {
	// 		handleNext();
	// 	}
	// };

	return (
		<form
			name="enter-device-form"
			method="post"
			onSubmit={handleSubmit(onSubmit)}
		>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Controller
						name="identifier"
						control={control}
						render={({
							field: { onChange, value },
							fieldState: { error },
						}) => {
							return (
								<TextField
									helperText={error ? error.message : null}
									placeholder="ASDF GHJK"
									size="medium"
									error={!!error}
									onChange={onChange}
									value={value}
									fullWidth
									label="Enter Device ID"
									variant="outlined"
									InputProps={{
										inputComponent: TextMaskCustom as any,
										startAdornment: (
											<InputAdornment position="start">
												<AllOut />
											</InputAdornment>
										),
									}}
								/>
							);
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<Button
						size="large"
						variant="contained"
						type="submit"
						color="primary"
						fullWidth
						disabled={!isValid}
					>
						Add device
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};

export default Form;
