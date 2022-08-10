import { FormInputText } from '@components/molecules';
import { PhonelinkSetupSharp } from '@mui/icons-material';
import { Button, Grid, InputAdornment } from '@mui/material';
import { useCallback, useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { EnterDeviceContext } from 'views/EnterDeviceIdView';
import * as yup from 'yup';

const useValidationResolver = (validationSchema) =>
	useCallback(
		async (data) => {
			try {
				const values = await validationSchema.validate(data, {
					abortEarly: false,
				});

				return {
					values,
					errors: {},
				};
			} catch (errors: any) {
				return {
					values: {},
					errors: errors.inner.reduce(
						(allErrors, currentError) => ({
							...allErrors,
							[currentError.path]: {
								type: currentError.type ?? 'validation',
								message: currentError.message,
							},
						}),
						{}
					),
				};
			}
		},
		[validationSchema]
	);

const schema = yup
	.object({
		deviceId: yup
			.string()
			.required('Device ID is required for you to proceed')
			.test(
				'len',
				'Device ID should be 8 characters. Kindly confirm',
				(val) => val?.toString().length === 8
			),
	})
	.required();

type IFormInput = {
	deviceId: string;
};

const defaultValues = {
	deviceId: '',
};

const Form = (): JSX.Element => {
	const dispatch = useDispatch();
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

	const { handleSubmit, control } = useForm<IFormInput>({
		defaultValues: defaultValues,
		resolver: useValidationResolver(schema),
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
					<FormInputText
						name="deviceId"
						size="medium"
						control={control}
						label="Enter device ID"
						type="text"
						iconPosition="start"
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<PhonelinkSetupSharp />
								</InputAdornment>
							),
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
						// disabled={isValid}
					>
						Add device
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};

export default Form;
