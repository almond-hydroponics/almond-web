import { yupResolver } from '@hookform/resolvers/yup';
import { PhonelinkSetupSharp } from '@mui/icons-material';
import { Button, Grid, InputAdornment, TextField } from '@mui/material';
import { forwardRef, useContext } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import { EnterDeviceContext } from 'views/EnterDeviceIdView';
import * as yup from 'yup';

const schema = yup
	.object({
		deviceId: yup
			.string()
			.required('Device ID is required for you to proceed')
			.min(9, 'Device ID should be 8 characters. Kindly confirm.'),
		// .test(
		// 	'len',
		// 	'Device ID should be 8 characters. Kindly confirm',
		// 	(val) => val?.toString().length === 9
		// ),
	})
	.required();

type IFormInput = {
	deviceId: string;
};

const defaultValues = {
	deviceId: '',
};

interface CustomProps {
	onChange: (event: { target: { name: string; value: string } }) => void;
	name: string;
}

const TextMaskCustom = forwardRef<HTMLElement, CustomProps>(
	function TextMaskCustom(props, ref) {
		const { onChange, ...other } = props;
		return (
			<IMaskInput
				{...other}
				mask="aaaa-aaaa"
				// @ts-expect-error Ref is allowed for now
				inputRef={ref}
				onAccept={(value: unknown) =>
					onChange({
						target: {
							name: props.name,
							value: String(value).toUpperCase(),
						},
					})
				}
				overwrite
			/>
		);
	}
);
const Form = (): JSX.Element => {
	// const { device } = useSelector(
	// 	(globalState: IRootState) => globalState,
	// 	shallowEqual
	// );

	const { handleNext } = useContext(EnterDeviceContext);

	// const { values, isValid, errors, hasError, handleFormChange } = useFormState(
	// 	{
	// 		onSubmit: ({ deviceId }) => {
	// 			dispatch(verifyUserDevice({ id: deviceId }));
	// 		},
	// 		formErrors: (formValues) => validate(formValues, schema),
	// 	},
	// );

	const {
		handleSubmit,
		control,
		formState: { isValid },
	} = useForm<IFormInput>({
		defaultValues: defaultValues,
		resolver: yupResolver(schema),
		mode: 'onChange',
	});

	const onSubmit: SubmitHandler<IFormInput> = ({ deviceId }) => {};

	// const onSubmit = (e) => {
	// 	handleSubmit(e);
	// 	console.log('Class: , Function: onSubmit, Line 45 device():', device);
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
						name="deviceId"
						control={control}
						render={({
							field: { onChange, value },
							fieldState: { error },
						}) => {
							return (
								<TextField
									helperText={error ? error.message : null}
									size="medium"
									error={!!error}
									onChange={onChange}
									value={value}
									fullWidth
									label="Enter device ID"
									variant="outlined"
									InputProps={{
										inputComponent: TextMaskCustom as any,
										endAdornment: (
											<InputAdornment position="end">
												<PhonelinkSetupSharp />
											</InputAdornment>
										),
									}}
								/>
							);
						}}
					/>
					{/*<FormInputText*/}
					{/*	name="deviceId"*/}
					{/*	size="medium"*/}
					{/*	control={control}*/}
					{/*	label="Enter device ID"*/}
					{/*	type="text"*/}
					{/*	iconPosition="start"*/}
					{/*	InputProps={{*/}
					{/*		endAdornment: (*/}
					{/*			<InputAdornment position="end">*/}
					{/*				<PhonelinkSetupSharp />*/}
					{/*			</InputAdornment>*/}
					{/*		),*/}
					{/*	}}*/}
					{/*/>*/}
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
