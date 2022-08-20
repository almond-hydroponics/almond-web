import {
	MenuBottomProps,
	MenuComponentProps,
} from '@components/molecules/MenuRoutes/interfaces';
import {
	AllOut,
	BubbleChart,
	ControlCamera,
	LocalFlorist,
	Memory,
	Opacity,
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
];

export const BottomNavigationMenus: MenuBottomProps[] = [
	{
		icon: <WidgetsRounded fontSize={'small'} />,
		label: 'Analytics',
		value: 'analytics',
	},
	{
		icon: <Opacity fontSize={'small'} />,
		label: 'Water',
		value: 'water',
	},
	{
		icon: <ControlCamera fontSize={'small'} />,
		label: 'Environment',
		value: 'environment',
	},
	{
		icon: <Security fontSize={'small'} />,
		label: 'Quality',
		value: 'quality',
	},
	{
		icon: <Memory fontSize={'small'} />,
		label: 'Energy',
		value: 'energy',
	},
];

export const AdminBottomNavigationMenus: MenuBottomProps[] = [
	{
		icon: <WidgetsRounded fontSize={'small'} />,
		label: 'Analytics',
		value: 'analytics',
	},
	{
		icon: <AllOut fontSize={'small'} />,
		label: 'Devices',
		value: 'devices',
	},
	{
		icon: <People fontSize={'small'} />,
		label: 'People',
		value: 'people',
	},
	{
		icon: <BubbleChart fontSize={'small'} />,
		label: 'Roles',
		value: 'roles',
	},
	{
		icon: <Spa fontSize={'small'} />,
		label: 'Requests',
		value: 'requests',
	},
];
