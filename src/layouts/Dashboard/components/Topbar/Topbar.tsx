// components
import Logo from '@components/atoms/Logo';
import { Notifications } from '@components/molecules';
import CustomAvatar from '@components/molecules/CustomAvatar';
import { ComponentContext } from '@context/ComponentContext';
import {
	ArrowDropDownTwoTone,
	ArrowDropUpTwoTone,
	FiberManualRecord,
	Timeline,
} from '@mui/icons-material';
import {
	Badge,
	Theme,
	Tooltip,
	Typography,
	useMediaQuery,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { alpha, useTheme } from '@mui/material/styles';
import { Device, Role } from '@prisma/client';
import arrayIsEmpty from '@utils/arrayIsEmpty';
import { useSession } from 'next-auth/react';
import { useContext } from 'react';

// import { activityLogs } from '@views/DashboardContainer/DashboardContainer';
// import { useMqttState } from 'mqtt-react-hooks';

const connectedColor = '#76ff03';
const reconnectingColor = '#FFCE56';
const closedColor = '#ff1744';
const offlineColor = '#CCCCCC';

const Topbar = (): JSX.Element => {
	const isSm = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
	const { toggleActivityDrawer, setDeviceModalOpen, isSelectDeviceModalOpen } =
		useContext(ComponentContext);
	const connectionStatus = 'Connected';

	const { data: session } = useSession();
	const role = session?.user?.role as Role;
	const devices = session?.user?.devices || ([] as Device[]);

	const theme = useTheme();
	const { mode } = theme.palette;

	const activityLogs = [];

	const statusChange = (mqttStatus: string): string => {
		switch (mqttStatus) {
			case 'Connected':
				return connectedColor;
			case 'Reconnecting':
				return reconnectingColor;
			case 'Closed':
				return closedColor;
			case 'Offline':
				return offlineColor;
			default:
				return reconnectingColor;
		}
	};

	const renderMoreButton = (handleClick) =>
		isSelectDeviceModalOpen ? (
			<ArrowDropUpTwoTone />
		) : (
			<ArrowDropDownTwoTone onClick={handleClick} />
		);

	const renderTimeLineIcon = (): JSX.Element => {
		const handleClick = () => toggleActivityDrawer(true, true);
		return (
			<Tooltip title="Check device activities">
				<Button
					variant={'outlined'}
					aria-label="Dark mode toggler"
					color={mode === 'light' ? 'primary' : 'secondary'}
					sx={{
						borderRadius: 1,
						minWidth: 'auto',
						paddingX: 1,
						borderColor: alpha(theme.palette.divider, 0.2),
					}}
				>
					<Badge
						// overlap="circular"
						variant="dot"
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						color="secondary"
						badgeContent={activityLogs.length}
					>
						<Timeline color="primary" onClick={handleClick} />
					</Badge>
				</Button>
			</Tooltip>
		);
	};

	const renderDeviceDisplay = (): JSX.Element => {
		const handleClick = (): void => setDeviceModalOpen(true);
		const handleDeviceModal = (): void => setDeviceModalOpen(true);
		return (
			<Button
				variant="outlined"
				onClick={handleClick}
				onKeyDown={handleDeviceModal}
				startIcon={
					<FiberManualRecord
						fontSize="small"
						sx={{ color: statusChange(connectionStatus as string) }}
					/>
				}
				endIcon={renderMoreButton(handleClick)}
				sx={{
					borderColor: alpha(theme.palette.divider, 0.2),
					backgroundColor: theme.palette.alternate.main,
				}}
			>
				<Typography
					variant="subtitle2"
					sx={{
						fontWeight: 400,
						fontSize: 13,
						marginLeft: 1,
						display: isSm ? 'flex' : 'none',
					}}
					color="textPrimary"
				>
					Device:
				</Typography>
				<Typography
					variant="subtitle2"
					sx={{
						paddingLeft: 0.5,
						fontWeight: 600,
					}}
				>
					{arrayIsEmpty(devices) ? 'No device' : devices[0].name}
				</Typography>
			</Button>
		);
	};

	return (
		<Box
			display={'flex'}
			justifyContent={'space-between'}
			alignItems={'center'}
			width={1}
		>
			<Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'}>
				<Logo displayText />
			</Box>

			<Box sx={{ display: 'flex' }} alignItems={'center'}>
				<Box sx={{ display: 'flex' }} alignItems={'center'}>
					{role === 'USER' && renderDeviceDisplay()}
				</Box>
				<Box marginLeft={isSm ? 3 : 1}>{renderTimeLineIcon()}</Box>
				<Box marginLeft={isSm ? 3 : 1}>
					<Notifications />
				</Box>
				<Box marginLeft={isSm ? 3 : 1}>
					<CustomAvatar />
				</Box>
			</Box>
		</Box>
	);
};

export default Topbar;
