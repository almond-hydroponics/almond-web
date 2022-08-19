import { MenuContent } from '@components/atoms';
import Container from '@components/Container';
import { BottomNavigation } from '@components/molecules';
import {
	AppBar,
	Box,
	Drawer,
	LinearProgress,
	Slide,
	Theme,
	Toolbar,
	useMediaQuery,
	useScrollTrigger,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import {
	ReactElement,
	ReactNode,
	cloneElement,
	useEffect,
	useState,
} from 'react';

import { Topbar } from './components';

interface AppBarOnScrollProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	children: ReactElement<any, any>;
	window?: () => Window;
	isMobileView?: boolean;
}

function ElevationScroll({
	children,
	window,
	isMobileView,
}: AppBarOnScrollProps) {
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
		target: window ? window() : undefined,
	});

	return isMobileView ? (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	) : (
		cloneElement(children, {
			elevation: trigger ? 4 : 0,
		})
	);
}

interface Props {
	children: ReactNode;
}

const useMounted = () => {
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);
	return mounted;
};

const Dashboard = ({ children }: Props): JSX.Element => {
	const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});
	const isMounted = useMounted();

	// const options: IClientOptions = {
	// 	username: process.env.NEXT_PUBLIC_MQTT_USERNAME,
	// 	password: process.env.NEXT_PUBLIC_MQTT_PASSWORD,
	// 	clientId: process.env.NEXT_PUBLIC_MQTT_CLIENTID,
	// 	// keepalive: 0,
	// 	// clientId: 'almond',
	// 	// protocolId: 'MQTT',
	// 	// protocolVersion: 4,
	// 	// clean: true,
	// 	// reconnectPeriod: 1000,
	// 	// connectTimeout: 30 * 1000,
	// 	// will: {
	// 	// topic: 'almond/lastWill',
	// 	// payload: 'Connection Closed abnormally..!',
	// 	// qos: 2,
	// 	// retain: false,
	// 	// },
	// 	// key: bufferKey,
	// 	// cert: bufferCert,
	// 	// ca: bufferCA,
	// 	rejectUnauthorized: false,
	// };

	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
	});

	return (
		// <Connector
		// 	brokerUrl={`wss://${process.env.NEXT_PUBLIC_MQTT_HOST}:${process.env.NEXT_PUBLIC_MQTT_PORT}`}
		// 	options={options}
		// 	parserMethod={(msg) => msg}
		// >
		<Box position={'relative'} minHeight={'100vh'}>
			<AppBar
				position={'sticky'}
				sx={{
					// background: theme.palette.alternate.main,
					top: 0,
					backgroundColor: trigger ? 'hsla(0,0%,100%,.8)' : 'transparent',
					backdropFilter: trigger ? 'blur(15px)' : 'none',
					borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
				}}
				elevation={0}
			>
				<Container
					maxWidth={1}
					paddingY={{ xs: 2, md: 1 }}
					paddingX={{ xs: 1, md: 4 }}
				>
					<Topbar />
				</Container>
			</AppBar>
			{hidden && (
				<Drawer
					variant="permanent"
					PaperProps={{
						sx: {
							background: theme.palette.alternate.main,
							borderRight: 'none',
						},
					}}
				>
					<Toolbar />
					<MenuContent />
				</Drawer>
			)}
			<main>
				<Box height={{ xs: 58, sm: 66 }} />
				<Box
					display="flex"
					flex="1 1 auto"
					overflow="hidden"
					paddingLeft={{ md: '10%' }} // Replace with 148px if it doesn't work
				>
					<Box display="flex" flex="1 1 auto" overflow="hidden">
						<Box flex="1 1 auto" height="100%" overflow="auto">
							{isMounted ? children : <LinearProgress color="primary" />}
						</Box>
					</Box>
				</Box>
			</main>
			{hidden ? null : (
				<Container>
					<BottomNavigation />
				</Container>
			)}
		</Box>
	);
};

export default Dashboard;
