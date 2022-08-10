import useFormState from '@hooks/useFormState';
import { editUserDetails } from '@modules/user';
import {
	AlternateEmailTwoTone,
	CameraAlt,
	FaceTwoTone,
} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
	Avatar,
	Badge,
	Box,
	Divider,
	FormControl,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	Link,
	OutlinedInput,
	TextField,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import authService from '@utils/auth';
import Axios from 'axios';
import { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import validate from 'validate.js';

import { IRootState } from '../../../../store/rootReducer';

const Input = styled('input')({
	display: 'none',
});

const schema = {
	email: {
		presence: { allowEmpty: false, message: 'is required' },
		email: true,
		length: {
			maximum: 300,
		},
	},
	firstName: {
		presence: { allowEmpty: false, message: 'is required' },
		length: {
			maximum: 120,
		},
	},
	lastName: {
		presence: { allowEmpty: false, message: 'is required' },
		length: {
			maximum: 120,
		},
	},
	photo: {
		presence: { allowEmpty: false, message: 'is required' },
		length: {
			maximum: 120,
		},
	},
};

const General = (): JSX.Element => {
	const dispatch = useDispatch();
	const [allowedFields, useAllowedFields] = useState<string[]>([]);
	const [selectedPhoto, setSelectedPhoto] = useState<any>();
	const [isPhotoPicked, setIsPhotoPicked] = useState<boolean>(false);

	const {
		userDetails: { _id, firstName, lastName, email, photo },
		isLoading,
	} = useSelector((globalState: IRootState) => globalState.user, shallowEqual);

	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	const handleChange = (event) => {
		useAllowedFields((prevState) => [...prevState, event.target.name]); // eslint-disable-line react-hooks/rules-of-hooks
		if (event.target.name === 'photo') {
			setSelectedPhoto(() => event.target.files[0]);
			setIsPhotoPicked(() => true);
		}
		handleFormChange(event);
	};

	const filteredSchema = Object.keys(schema)
		.filter((key) => allowedFields.includes(key))
		.reduce(
			(obj, key) => ({
				...obj,
				[key]: schema[key],
			}),
			{}
		);

	const getUserProfilePhotoUrl = async (): Promise<string> => {
		const formData = new FormData();
		formData.append('file', selectedPhoto);

		try {
			const response = await Axios.post(
				`${process.env.NEXT_ALMOND_API}/upload_photo`,
				formData,
				{
					headers: {
						Authorization: `Basic ${authService.getToken()}`,
					},
				}
			);
			return response.data as unknown as string;
		} catch (e: any) {
			return e.response ? e.response : e;
		}
	};

	const { values, isValid, errors, hasError, handleFormChange, handleSubmit } =
		useFormState({
			onSubmit: async (userDetails) =>
				dispatch(
					editUserDetails(_id, {
						...userDetails,
						...(values.photo && { photo: await getUserProfilePhotoUrl() }),
					})
				),
			formErrors: (formValues) => validate(formValues, filteredSchema),
		});

	const renderUploadPhotoButton = () => (
		<FormControl fullWidth variant="outlined">
			<InputLabel htmlFor="outlined-adornment-password">
				Change profile photo
			</InputLabel>
			<OutlinedInput
				name="photo"
				id="change-profile-photo"
				type="text"
				value={isPhotoPicked ? selectedPhoto.name : 'Change profile photo'}
				onChange={handleChange}
				endAdornment={
					<InputAdornment position="end">
						<IconButton aria-label="change profile photo" edge="end">
							<Badge
								overlap="circular"
								anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
								badgeContent={
									<label htmlFor="upload-photo">
										<Input
											name="photo"
											accept="image/*"
											id="upload-photo"
											type="file"
											onChange={handleChange}
											value={values.profilePhoto ?? ''}
										/>
										<IconButton
											color="primary"
											aria-label="upload picture"
											component="span"
										>
											<CameraAlt />
										</IconButton>
									</label>
								}
							>
								<Avatar alt={firstName} src={photo} />
							</Badge>
						</IconButton>
					</InputAdornment>
				}
				label="Change profile photo"
			/>
		</FormControl>
	);

	return (
		<Box>
			<Typography variant="h6" gutterBottom fontWeight={700}>
				Change your private information
			</Typography>
			<Typography variant={'subtitle2'} color={'text.secondary'}>
				Please read our{' '}
				<Link color={'primary'} href={'/company-terms'} underline={'none'}>
					terms of use
				</Link>{' '}
				to be informed how we manage your private data.
			</Typography>
			<Box paddingY={4}>
				<Divider />
			</Box>

			<form method="post" onSubmit={handleSubmit}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<TextField
							label="First Name"
							variant="outlined"
							size="medium"
							name="firstName"
							fullWidth
							type="text"
							helperText={hasError('firstName') ? errors.firstName[0] : null}
							error={hasError('firstName')}
							onChange={handleChange}
							value={values.firstName ?? firstName ?? ''}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton aria-label="firstName" edge="end">
											<FaceTwoTone color="primary" />
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label="Last Name"
							variant="outlined"
							size="medium"
							name="lastName"
							fullWidth
							type="text"
							helperText={hasError('lastName') ? errors.lastName[0] : null}
							error={hasError('lastName')}
							onChange={handleChange}
							value={values.lastName ?? lastName ?? ''}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton aria-label="lastName" edge="end">
											<FaceTwoTone color="primary" />
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label="Email Address"
							variant="outlined"
							size="medium"
							name="email"
							fullWidth
							type="email"
							helperText={hasError('email') ? errors.email[0] : null}
							error={hasError('email')}
							onChange={handleChange}
							value={values.email ?? email ?? ''}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton aria-label="email" edge="end">
											<AlternateEmailTwoTone color="primary" />
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						{renderUploadPhotoButton()}
					</Grid>
					<Grid item xs={12}>
						<Divider />
					</Grid>
					<Grid item xs={isMd ? 6 : 12}>
						<LoadingButton
							autoFocus
							fullWidth
							variant="contained"
							type="submit"
							color="primary"
							size="large"
							disabled={!isValid}
							loading={isLoading}
							loadingIndicator="Requesting..."
						>
							Send
						</LoadingButton>
					</Grid>
				</Grid>
			</form>
		</Box>
	);
};

export default General;
