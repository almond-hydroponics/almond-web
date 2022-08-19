import {
	MenuBottomProps,
	MenuComponentProps,
} from '@components/molecules/MenuRoutes/interfaces';
import {
	AllOut,
	BubbleChart,
	ControlCamera,
	Help,
	LocalFlorist,
	Memory,
	Opacity,
	OpenInNew,
	People,
	Security,
	Spa,
	WidgetsRounded,
} from '@mui/icons-material';
import AnalyticsView from 'views/AnalyticsView';
// import DeviceManagementView from 'views/DeviceManagementView';
// import EnvironmentControlView from 'views/EnvironmentControlView';
// import PeopleView from 'views/PeopleView';
// import SupportView from 'views/SupportView';
// import UserRolesView from 'views/UserRolesView';
// import WaterCyclesView from 'views/WaterCyclesView';

export const UserMenus: MenuComponentProps[] = [
	{
		icon: <WidgetsRounded />,
		primaryText: 'Analytics',
		component: AnalyticsView,
		id: 'analytics',
	},
	{
		icon: <Opacity />,
		primaryText: 'Water Cycles',
		component: AnalyticsView,
		id: 'water-cycles',
	},
	{
		icon: <ControlCamera />,
		primaryText: 'Environment',
		component: AnalyticsView,
		id: 'environment',
	},
	{
		icon: <Security />,
		primaryText: 'Quality Control',
		component: AnalyticsView,
		id: 'quality-control',
	},
	{
		icon: <Memory />,
		primaryText: 'Energy Usage',
		component: AnalyticsView,
		id: 'energy-usage',
	},
	{
		icon: <LocalFlorist />,
		primaryText: 'Support',
		component: AnalyticsView,
		id: 'support',
	},
	{
		icon: <Help />,
		primaryText: 'Help',
		component: AnalyticsView,
		id: 'help',
	},
	{
		icon: <OpenInNew />,
		primaryText: 'Send feedback',
		component: AnalyticsView,
		id: 'send-feedback',
	},
];

export const AdminMenus: MenuComponentProps[] = [
	{
		icon: <WidgetsRounded />,
		primaryText: 'Analytics',
		component: AnalyticsView,
		id: 'analytics',
	},
	{
		icon: <AllOut />,
		primaryText: 'Devices',
		component: AnalyticsView,
		id: 'devices',
	},
	{
		icon: <People />,
		primaryText: 'People',
		component: AnalyticsView,
		id: 'people',
	},
	{
		icon: <BubbleChart />,
		primaryText: 'Roles',
		component: AnalyticsView,
		id: 'roles',
	},
	{
		icon: <Spa />,
		primaryText: 'Support',
		component: AnalyticsView,
		id: 'support',
	},
	{
		icon: <Help />,
		primaryText: 'Help',
		component: AnalyticsView,
		id: 'help',
	},
];

export const BottomNavigationMenus: MenuBottomProps[] = [
	{
		icon: <WidgetsRounded />,
		label: 'Analytics',
		value: 'analytics',
	},
	{
		icon: <Opacity />,
		label: 'Water',
		value: 'water',
	},
	{
		icon: <ControlCamera />,
		label: 'Environment',
		value: 'environment',
	},
	{
		icon: <Security />,
		label: 'Quality',
		value: 'quality',
	},
	{
		icon: <Memory />,
		label: 'Energy',
		value: 'energy',
	},
];

export const AdminBottomNavigationMenus: MenuBottomProps[] = [
	{
		icon: <WidgetsRounded />,
		label: 'Analytics',
		value: 'analytics',
	},
	{
		icon: <AllOut />,
		label: 'Devices',
		value: 'devices',
	},
	{
		icon: <People />,
		label: 'People',
		value: 'people',
	},
	{
		icon: <BubbleChart />,
		label: 'Roles',
		value: 'roles',
	},
	{
		icon: <Spa />,
		label: 'Requests',
		value: 'requests',
	},
];
