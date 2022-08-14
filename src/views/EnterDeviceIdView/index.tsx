import Container from '@components/Container';
import {
	ArrowForward,
	KeyboardArrowLeft,
	KeyboardArrowRight,
} from '@mui/icons-material';
import {
	Box,
	Button,
	Checkbox,
	Divider,
	FormControlLabel,
	Paper,
	Stack,
	Step,
	StepLabel,
	Stepper,
	Typography,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AddDeviceIllustration2 } from '@svg/illustrations';
// import { requestPermission } from '@utils/Firebase/firebaseMessaging';
import { useRouter } from 'next/router';
import { ReactNode, createContext, useState } from 'react';

import { Minimal } from '../../layouts';
import { ConnectionForm, Form } from './components';

export const EnterDeviceContext = createContext({
	handleNext: () => {},
});

const steps = ['Add device', 'Connectivity', 'Finish'];

const EnterDeviceIdView = (): JSX.Element => {
	const router = useRouter();
	const theme = useTheme();
	const isSm = useMediaQuery(theme.breakpoints.down('sm'), {
		defaultMatches: true,
	});

	const [value, setValue] = useState(0);

	const [activeStep, setActiveStep] = useState<number>(0);
	const [skipped, setSkipped] = useState(new Set<number>());

	const isStepOptional = (step: number) => step === 1;
	const isStepSkipped = (step: number) => skipped.has(step);

	const handleNext = () => {
		let newSkipped = skipped;
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values());
			newSkipped.delete(activeStep);
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped(newSkipped);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleSkip = () => {
		if (!isStepOptional(activeStep)) {
			// You probably want to guard against something like this,
			// it should never occur unless someone's actively trying to break something.
			throw new Error("You can't skip a step that isn't optional.");
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped((prevSkipped) => {
			const newSkipped = new Set(prevSkipped.values());
			newSkipped.add(activeStep);
			return newSkipped;
		});
	};

	const page1 = () => (
		<Box paddingTop={12}>
			<Box height={1} width={1} maxWidth={500}>
				<Typography variant="h6" gutterBottom>
					Let&apos;s setup your device first.
				</Typography>
				<Typography variant={'body2'} color={'text.secondary'}>
					The device ID will help you to control your purchased device from
					Almond. Kindly enter the 8 digit provided on purchase.
				</Typography>
			</Box>
			<Box paddingY={{ xs: 3, md: 4 }}>
				<Divider />
			</Box>
			<Box width={1} maxWidth={500}>
				<Form />
			</Box>
		</Box>
	);

	const page2 = () => (
		<Box paddingTop={12}>
			<Box height={1} width={1} maxWidth={500}>
				<Typography variant="h6" gutterBottom>
					Checking your connectivity status.
				</Typography>
				<Typography variant={'body2'} color={'text.secondary'}>
					Setup your WIFI configuration for the device. Make sure your device
					is powered on to complete this step.
				</Typography>
			</Box>
			<Box paddingY={{ xs: 3, md: 4 }}>
				<Divider />
			</Box>
			<Box height={1} width={1} maxWidth={500} paddingBottom={5}>
				<ConnectionForm />
			</Box>
		</Box>
	);

	const page3 = () => (
		<Box paddingTop={12}>
			<Box height={1} width={1} maxWidth={500}>
				<Typography variant="h6" gutterBottom>
					Just a minute. How about notifications?
				</Typography>
				<Typography variant={'body2'} color={'text.secondary'}>
					Your device has been setup successfully. Below are some of the
					default notification settings to receive from your device.
				</Typography>
				<Box paddingY={{ xs: 3, md: 4 }}>
					<Divider />
				</Box>
				<Box>
					<Box>
						<FormControlLabel
							control={<Checkbox color="primary" />}
							label="Push notifications"
							// onChange={requestPermission}
						/>
					</Box>
					<Box>
						<FormControlLabel
							control={<Checkbox color="primary" />}
							label="E-mail alerts"
						/>
					</Box>
					<Box>
						<FormControlLabel
							control={<Checkbox color="primary" />}
							label="Text messages"
						/>
					</Box>
				</Box>
				<Box paddingTop={4}>
					<Button
						fullWidth
						variant="contained"
						type="submit"
						color="primary"
						size="large"
					>
						Save
					</Button>
				</Box>
			</Box>
		</Box>
	);

	// const steps = [page1, page2, page3];

	const activePage = (page: number) => {
		switch (page) {
			case 0:
				return (
					<Box paddingTop={12}>
						<Box height={1} width={1} maxWidth={500}>
							<Typography variant="h6" gutterBottom>
								Let&apos;s setup your device first.
							</Typography>
							<Typography variant={'body2'} color={'text.secondary'}>
								The device ID will help you to control your purchased device
								from Almond. Kindly enter the 8 digit provided on purchase.
							</Typography>
						</Box>
						<Box paddingY={{ xs: 3, md: 4 }}>
							<Divider />
						</Box>
						<Box width={1} maxWidth={500}>
							<Form />
						</Box>
					</Box>
				);
			case 1:
				return (
					<Box paddingTop={12}>
						<Box height={1} width={1} maxWidth={500}>
							<Typography variant="h6" gutterBottom>
								Checking your connectivity status.
							</Typography>
							<Typography variant={'body2'} color={'text.secondary'}>
								Setup your WIFI configuration for the device. Make sure your
								device is powered on to complete this step.
							</Typography>
						</Box>
						<Box paddingY={{ xs: 3, md: 4 }}>
							<Divider />
						</Box>
						<Box height={1} width={1} maxWidth={500} paddingBottom={5}>
							<ConnectionForm />
						</Box>
					</Box>
				);
			case 2:
				return (
					<Box paddingTop={12}>
						<Box height={1} width={1} maxWidth={500}>
							<Typography variant="h6" gutterBottom>
								Just a minute. How about notifications?
							</Typography>
							<Typography variant={'body2'} color={'text.secondary'}>
								Your device has been setup successfully. Below are some of the
								default notification settings to receive from your device.
							</Typography>
							<Box paddingY={{ xs: 3, md: 4 }}>
								<Divider />
							</Box>
							<Box>
								<Box>
									<FormControlLabel
										control={<Checkbox color="primary" />}
										label="Push notifications"
										// onChange={requestPermission}
									/>
								</Box>
								<Box>
									<FormControlLabel
										control={<Checkbox color="primary" />}
										label="E-mail alerts"
									/>
								</Box>
								<Box>
									<FormControlLabel
										control={<Checkbox color="primary" />}
										label="Text messages"
									/>
								</Box>
							</Box>
							<Box paddingTop={4}>
								<Button
									fullWidth
									variant="contained"
									type="submit"
									color="primary"
									size="large"
								>
									Save
								</Button>
							</Box>
						</Box>
					</Box>
				);
			default:
				return (
					<>
						<Box height={1} width={1} maxWidth={300} paddingBottom={1}>
							<AddDeviceIllustration2 />
						</Box>
						<Box height={1} width={1} maxWidth={500}>
							<Typography variant={'subtitle2'} color={'text.secondary'}>
								Setup your WIFI configuration for the device. Make sure your
								device is powered on to complete this step.
							</Typography>
						</Box>
						<Box paddingY={2}>
							<Divider />
						</Box>
					</>
				);
		}
	};

	const renderBottomNavigation = (): JSX.Element => (
		<Box sx={{ minWidth: 500 }}>
			<Paper
				sx={{
					position: 'fixed',
					bottom: 0,
					left: 0,
					right: 0,
					// background: theme.palette.alternate.main,
					paddingY: 1,
					borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
					paddingX: 0,
					// borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
				}}
				elevation={0}
			>
				<Stack
					direction="row"
					justifyContent="space-around"
					alignItems="center"
					spacing={2}
				>
					<Button
						variant="text"
						onClick={handleBack}
						disabled={activeStep === 0}
						startIcon={
							theme.direction === 'rtl' ? (
								<KeyboardArrowRight />
							) : (
								<KeyboardArrowLeft />
							)
						}
					>
						Back
					</Button>
					<Button
						variant="text"
						onClick={handleNext}
						endIcon={
							theme.direction === 'rtl' ? (
								<KeyboardArrowLeft />
							) : (
								<KeyboardArrowRight />
							)
						}
					>
						{activeStep === steps.length - 1
							? 'Finish'
							: isStepOptional(activeStep)
							? 'Skip'
							: 'Next'}
					</Button>
				</Stack>
			</Paper>
		</Box>
	);

	const maxSteps = steps.length;

	const background = '/img/background_illustration.svg';

	return (
		<EnterDeviceContext.Provider value={{ handleNext }}>
			<Minimal>
				<Container
					maxWidth={{ sm: 720, md: 960 }}
					sx={{
						backgroundImage: `url(${background})`,
						backgroundPositionX: 'center',
						backgroundRepeat: 'no-repeat',
					}}
				>
					<Stack
						direction={'column'}
						justifyContent="space-around"
						alignItems="center"
						spacing={2}
					>
						<Box
							// height={1}
							width={1}
							// maxWidth={700}
							// paddingBottom={{ xs: 0, md: 6 }}
						>
							<Stepper activeStep={activeStep} alternativeLabel={isSm}>
								{steps.map((label, index) => {
									const stepProps: { completed?: boolean } = {};
									const labelProps: {
										optional?: ReactNode;
									} = {};
									// if (isStepOptional(index)) {
									// 	labelProps.optional = (
									// 		<Typography variant="caption">(Optional)</Typography>
									// 	);
									// }
									if (isStepSkipped(index)) {
										stepProps.completed = false;
									}
									return (
										<Step key={label} {...stepProps}>
											<StepLabel {...labelProps}>{label}</StepLabel>
										</Step>
									);
								})}
							</Stepper>
						</Box>

						{activeStep === steps.length ? (
							<Stack
								direction={'column'}
								justifyContent="space-evenly"
								alignItems="center"
								spacing={3}
							>
								<Box height={400}>
									<AddDeviceIllustration2 />
								</Box>
								<Typography variant="h6" gutterBottom>
									Hooray!! You&apos;re all set!
								</Typography>
								<Box>
									<Button
										fullWidth
										variant="contained"
										color="primary"
										size="large"
										onClick={() => router.push('/dashboard')}
										endIcon={<ArrowForward />}
									>
										Go to dashboard
									</Button>
								</Box>
							</Stack>
						) : (
							<>{activePage(activeStep)}</>
						)}
					</Stack>
					{renderBottomNavigation()}
				</Container>
			</Minimal>
		</EnterDeviceContext.Provider>
	);
};

export default EnterDeviceIdView;
