import { MenuContent } from '@components/atoms';
import Container from '@components/Container';
import { BottomNavigation } from '@components/molecules';
import {
	AppBar,
	Box,
	CssBaseline,
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
	useRef,
	useState,
} from 'react';

import { Topbar } from './components';

const drawerWidth = 160;

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

const useMounted = () => {
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);
	return mounted;
};

interface Props {
	children: ReactNode;
}

const Dashboard = ({ children }: Props): JSX.Element => {
	const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
	const theme = useTheme();
	const isMounted = useMounted();

	const mounted = useRef(false);

	useEffect(() => {
		mounted.current = true;

		return () => {
			mounted.current = false;
		};
	}, []);

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
		<Box sx={{ display: 'flex', minHeight: '100vh' }}>
			{/*<Box position={'relative'} minHeight={'100vh'}>*/}
			<CssBaseline />
			<AppBar
				position={'fixed'}
				sx={{
					zIndex: (theme) => theme.zIndex.drawer + 1,
					// background: theme.palette.alternate.main,
					top: 0,
					backgroundColor: trigger ? 'hsla(0,0%,100%,.8)' : 'background.paper',
					backdropFilter: trigger ? 'blur(15px)' : 'none',
					borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
				}}
				elevation={0}
			>
				<Container maxWidth={1} paddingY={1} paddingX={{ xs: 1, md: 4 }}>
					<Topbar />
				</Container>
			</AppBar>
			{isMd && (
				<Drawer
					variant="permanent"
					sx={{
						width: drawerWidth,
						flexShrink: 0,
						[`& .MuiDrawer-paper`]: {
							width: drawerWidth,
							boxSizing: 'border-box',
							backgroundColor: 'alternate.main',
						},
					}}
					PaperProps={{
						sx: {
							// background: theme.palette.alternate.main,
							borderRight: 'none',
						},
					}}
				>
					<Toolbar />
					<MenuContent />
				</Drawer>
			)}
			<Box
				component="main"
				paddingX={isMd ? 3 : 0}
				paddingY={isMd ? 0 : 3}
				sx={{ flexGrow: 1, backgroundColor: 'alternate.main' }}
			>
				<Toolbar />
				{mounted ? children : <LinearProgress color="primary" />}
				{isMd ? null : (
					<Container>
						<BottomNavigation />
					</Container>
				)}
			</Box>
		</Box>
	);
};

export default Dashboard;
