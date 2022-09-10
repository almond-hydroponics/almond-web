// components;
import { BlankContent, Modal, TabPanel } from '@components/atoms';
import Container from '@components/Container';
import { AdminMenus, UserMenus } from '@components/molecules/MenuRoutes';
import { ComponentContext } from '@context/ComponentContext';
import { trpc } from '@lib/trpc';
import { Add, Close } from '@mui/icons-material';
// import { useSubscription } from '@hooks/mqtt';
import {
	Box,
	Button,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Stack,
	SwipeableDrawer,
	Theme,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { displaySnackMessage } from '@store/slices/snack';
import arrayIsEmpty from '@utils/arrayIsEmpty';
import dayjs from '@utils/dayjsTime';
// interfaces
import { IClientSubscribeOptions } from 'mqtt';
import { useRouter } from 'next/router';
import {
	ChangeEvent,
	createContext,
	createElement,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { useDispatch } from 'react-redux';

import Dashboard from '../../layouts/Dashboard';
import { DeviceTabs } from './components';

// third-party libraries

export const activityLogs = [
	{
		_id: '5eecc408184ccf003a2daa29',
		title: 'Device turned OFF successfully',
		createdAt: '2020-06-19T13:56:24.859Z',
		type: 'success',
	},
	{
		_id: '5eecc408184ccf003a2daad9',
		title: 'Pump crashed by a dragon',
		createdAt: '2020-06-19T13:56:24.859Z',
		type: 'error',
	},
	{
		_id: '5eecc408f84ccf003a2daa29',
		title: 'Sensor cannot be found',
		createdAt: '2020-06-19T13:56:24.859Z',
		type: 'error',
	},
	{
		_id: '5eecc408184ccfa03a2daa29',
		title: 'Next pump time is 12:00PM',
		createdAt: '2020-06-19T13:56:24.859Z',
		type: 'info',
	},
];

const useMounted = () => {
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);
	return mounted;
};

export const DashboardContext = createContext({
	handleDeviceSelect: (_id: string) => {},
});

const DashboardView = (): JSX.Element => {
	const history = useRouter();
	const dispatch = useDispatch();
	const [deviceId, setDeviceId] = useState<string>('');
	const { currentRoleBasedAccess, isAdmin } = useContext(ComponentContext);
	const mounted = useRef(false);

	const theme = useTheme();
	const isSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

	useEffect(() => {
		mounted.current = true;

		return () => {
			mounted.current = false;
		};
	}, []);

	const {
		selectedIndex,
		setSelectedIndex,
		toggleRoleChangeDialog,
		handleCloseDeviceModal,
		handleSelectDeviceModal,
		isSelectDeviceModalOpen,
		isChangeRoleDialogOpen,
		toggleActivityDrawer,
		isActivityDrawerOpen,
	} = useContext(ComponentContext);

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

	const subscribeOptions: IClientSubscribeOptions = {
		qos: 2,
		rap: true,
	};

	// :TODO: Reformat to get user specific device subscription
	// const userSensorSubscription = 'almond/data';
	// const { message } = useSubscription(
	// 	userSensorSubscription,
	// 	subscribeOptions,
	// );

	// useEffect(() => {
	// 	if (message) {
	// 		const parsedMessage = JSON.parse(message?.message as string);
	// 		const data = {
	// 			temperature: parsedMessage?.temp,
	// 			humidity: parsedMessage?.humid,
	// 			waterLevel: parsedMessage?.water_level,
	// 		};
	// 		dispatch(getSensorDataFromMqtt(data));
	// 	}
	// }, [message]); // eslint-disable-line react-hooks/exhaustive-deps

	// useEffect(() => {
	// 	setState((prevState) => ({
	// 		...prevState,
	// 		activeDevice,
	// 		device: activeDevice.id,
	// 	}));
	// }, []); // eslint-disable-line react-hooks/exhaustive-deps

	const handleDeviceSelect = (id: string) => setDeviceId(id);

	const handleSelectDevice = async () => {
		// const deviceId = devices.filter((device) => device.id === state.device);
		// await dispatch(activateDevice(deviceId[0]._id));
		// dispatch(getUserDetails());
		activateDeviceMutation.mutate({
			id: deviceId,
		});
		handleSelectDeviceModal();
		if (typeof window !== 'undefined') {
			window.location.reload();
		}
	};

	const handleDeviceInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const { value } = event.target;
	};

	const handleAddDeviceRedirect = async () => {
		await history.push('/account');
		handleSelectDeviceModal();
	};

	const renderSelectDeviceContent = () => (
		<>
			<Button
				size="small"
				onClick={handleAddDeviceRedirect}
				startIcon={<Add />}
			>
				Add device
			</Button>
			<DeviceTabs />
		</>
	);

	const renderSelectDeviceModal = (): JSX.Element => (
		<Modal
			maxWidth="sm"
			fullScreen={isSm}
			isModalOpen={isSelectDeviceModalOpen}
			renderDialogText={
				<Typography variant="body2">
					The device will allow you to control your environment and get
					different metrics for them.
				</Typography>
			}
			renderHeader="Select a device"
			renderContent={renderSelectDeviceContent()}
			onClose={handleSelectDeviceModal}
			submitButtonName="Open"
			onSubmit={handleSelectDevice}
			onDismiss={handleCloseDeviceModal}
		/>
	);

	const handleActivityDrawer = (status: 'open' | 'close') => () => {
		switch (status) {
			case 'open':
				toggleActivityDrawer(true, true);
				break;
			case 'close':
				toggleActivityDrawer(false, true);
				break;
			default:
				toggleActivityDrawer(false, true);
		}
	};

	/*
	 * Check if it is running on web browser in iOS
	 */
	// const iOS =
	// 	typeof window === 'undefined' &&
	// 	/iPad|iPhone|iPod/.test(navigator.userAgent);

	const renderActivityDrawer = () => (
		<SwipeableDrawer
			anchor="right"
			open={isActivityDrawerOpen}
			onClose={handleActivityDrawer('close')}
			onOpen={handleActivityDrawer('open')}
			// disableBackdropTransition={!iOS}
			// disableDiscovery={iOS}
			sx={{
				zIndex: 1400,
			}}
		>
			<Box
				sx={{ minWidth: 300, maxWidth: 400 }}
				role="presentation"
				onClick={handleActivityDrawer('close')}
				onKeyDown={handleActivityDrawer('close')}
			>
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center"
					spacing={2}
					paddingY={1}
					paddingX={2}
					sx={{
						borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
					}}
				>
					<Typography fontWeight={500}>Activity logs</Typography>
					<IconButton
						aria-label="close"
						onClick={handleActivityDrawer('close')}
						sx={{
							color: (theme) => theme.palette.primary.main,
						}}
					>
						<Close />
					</IconButton>
				</Stack>
				{arrayIsEmpty(activityLogs) ? (
					<List>
						{activityLogs?.map((logs) => (
							<ListItem key={logs._id} sx={{ paddingY: 0 }}>
								<ListItemText
									primary={logs.title}
									primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}
									secondaryTypographyProps={{ fontSize: 12, fontWeight: 400 }}
									secondary={`${dayjs(logs.createdAt).fromNow()}`}
									sx={{
										backgroundColor: (theme) =>
											alpha(theme.palette[logs.type ?? 'info'].main, 0.1),
										color: (theme) => theme.palette[logs.type ?? 'info'].dark,
										border: `1px solid ${alpha(
											theme.palette[logs.type ?? 'info'].dark,
											0.2
										)}`,
										borderRadius: 1,
										paddingY: 1,
										paddingX: 2,
									}}
								/>
							</ListItem>
						))}
					</List>
				) : (
					<Stack
						direction="column"
						justifyContent="center"
						alignItems="center"
						spacing={3}
					>
						<p
							aria-hidden="true"
							style={{
								font: '300 36px/44px Google Sans,Helvetica Neue,sans-serif',
								letterSpacing: 'normal',
								marginBottom: 24,
								color: '#646e73',
							}}
						>
							¯\_(ツ)_/¯{' '}
						</p>
						<BlankContent message="No logs found!" />
					</Stack>
				)}
			</Box>
		</SwipeableDrawer>
	);

	const displayMenusByRoleBase = {
		USER: UserMenus,
		ADMIN: isAdmin ? AdminMenus : UserMenus,
		DEVELOPER: UserMenus,
	};

	return (
		<DashboardContext.Provider value={{ handleDeviceSelect }}>
			<Box
				sx={{ overflowX: 'hidden', background: theme.palette.alternate.main }}
			>
				<Dashboard>
					<Container
						sx={{ position: 'relative' }}
						maxWidth={{
							sm: 720,
							md: '100%',
						}} // Replace md with 1440px if it doesn't work
						width={1}
						paddingY={1}
						paddingX={{ xs: 1 }}
					>
						<TabPanel index={selectedIndex} value={selectedIndex}>
							{createElement(UserMenus[selectedIndex].component, {
								history,
							})}
						</TabPanel>
						{renderSelectDeviceModal()}
						{renderActivityDrawer()}
					</Container>
				</Dashboard>
			</Box>
		</DashboardContext.Provider>
	);
};

export default DashboardView;
