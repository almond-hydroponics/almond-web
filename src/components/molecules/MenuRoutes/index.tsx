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
import AdminAnalyticsView from 'views/AdminAnalyticsView';
import DeviceManagementView from 'views/DeviceManagementView';
import UserAnalyticsView from 'views/UserAnalyticsView';
// import EnvironmentControlView from 'views/EnvironmentControlView';
// import PeopleView from 'views/PeopleView';
// import SupportView from 'views/SupportView';
// import UserRolesView from 'views/UserRolesView';
import WaterCycleView from 'views/WaterCycleView';

export const UserMenus: MenuComponentProps[] = [
	{
		icon: <WidgetsRounded />,
		primaryText: 'Analytics',
		component: UserAnalyticsView,
		id: 'analytics',
	},
	{
		icon: <Opacity />,
		primaryText: 'Water Cycles',
		component: WaterCycleView,
		id: 'water-cycles',
	},
	{
		icon: <ControlCamera />,
		primaryText: 'Environment',
		component: UserAnalyticsView,
		id: 'environment',
	},
	{
		icon: <Security />,
		primaryText: 'Quality Control',
		component: UserAnalyticsView,
		id: 'quality-control',
	},
	{
		icon: <Memory />,
		primaryText: 'Energy Usage',
		component: UserAnalyticsView,
		id: 'energy-usage',
	},
	{
		icon: <LocalFlorist />,
		primaryText: 'Support',
		component: UserAnalyticsView,
		id: 'support',
	},
];

export const AdminMenus: MenuComponentProps[] = [
	{
		icon: <WidgetsRounded />,
		primaryText: 'Analytics',
		component: AdminAnalyticsView,
		id: 'analytics',
	},
	{
		icon: <AllOut />,
		primaryText: 'Devices',
		component: DeviceManagementView,
		id: 'devices',
	},
	{
		icon: <People />,
		primaryText: 'People',
		component: AdminAnalyticsView,
		id: 'people',
	},
	{
		icon: <BubbleChart />,
		primaryText: 'Roles',
		component: AdminAnalyticsView,
		id: 'roles',
	},
	{
		icon: <Spa />,
		primaryText: 'Support',
		component: AdminAnalyticsView,
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
