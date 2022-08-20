import { MouseEvent, SyntheticEvent, createContext, useState } from 'react';

import { ComponentContextProps, ComponentContextState } from './interfaces';

const selectedIndex = JSON.parse(
	typeof window !== 'undefined'
		? (window.localStorage.getItem('selectedIndex') as string)
		: '0'
);

const currentRoleBasedAccess =
	typeof window === 'undefined'
		? 'USER'
		: window.localStorage.getItem('currentRoleBasedAccess');

const ComponentContext = createContext({
	isMenuOpen: false,
	selectedIndex: selectedIndex || 0,
	isSelectDeviceModalOpen: false,
	isActivityDrawerOpen: false,
	isChangeRoleDialogOpen: false,
	activityLogsViewed: false,
	setMenuOpen: (_open: boolean) => {},
	setSelectedIndex: (_selectedIndex: number) => {},
	setDeviceModalOpen: (_open: boolean) => {},
	setCurrentRoleBasedAccess: (_role: string) => {},
	handleSelectDeviceModal: () => {},
	handleCloseDeviceModal: () => {},
	toggleActivityDrawer: (
		_isActivityDrawerOpen: boolean,
		_activityLogsViewed: boolean
	) => {},
	toggleRoleChangeDialog: () => {},
	setSnackMessage: (_message: string) => {},
	setOpenSnack: (_open: boolean) => {},
	handleCloseSnack: (e: any) => {},
	snackMessage: '',
	isSnackOpen: false,
	csrfToken: '',
	setCsrfToken: (_csrfToken: string) => {},
	currentRoleBasedAccess: currentRoleBasedAccess || 'USER',
});

const ComponentProvider = ({
	children,
	...props
}: ComponentContextProps): JSX.Element => {
	const [state, setState] = useState<ComponentContextState>({
		isOpen: false,
		isMenuOpen: false,
		selectedIndex:
			JSON.parse(
				typeof window !== 'undefined'
					? (window.localStorage.getItem('selectedIndex') as string)
					: '0'
			) ?? 0,
		// JSON.parse(window.localStorage.getItem('selectedIndex') as string) || 0,
		isSelectDeviceModalOpen: false,
		isActivityDrawerOpen: false,
		isChangeRoleDialogOpen: false,
		activityLogsViewed: false,
		isSnackOpen: false,
		snackMessage: '',
		csrfToken: '',
		currentRoleBasedAccess:
			typeof window === 'undefined'
				? 'USER'
				: (window.localStorage.getItem('currentRoleBasedAccess') as string),
	});

	const setMenuOpen = (isOpen: boolean) =>
		setState((prevState) => ({ ...prevState, isMenuOpen: isOpen }));

	const setOpenSnack = (isOpen: boolean) =>
		setState((prevState) => ({ ...prevState, isSnackOpen: isOpen }));

	const setSnackMessage = (message: string) =>
		setState((prevState) => ({ ...prevState, snackMessage: message }));

	const setSelectedIndex = (selectedIndex: number) => {
		setState((prevState) => ({ ...prevState, selectedIndex }));
		window.localStorage.setItem(
			'selectedIndex',
			JSON.stringify(selectedIndex)
		);
	};

	const setCurrentRoleBasedAccess = (role: string) => {
		setState((prevState) => ({
			...prevState,
			currentRoleBasedAccess: role,
		}));
		window.localStorage.setItem('currentRoleBasedAccess', role);
	};

	const setDeviceModalOpen = (isModalOpen: boolean) => {
		setState((prevState) => ({
			...prevState,
			isSelectDeviceModalOpen: isModalOpen,
		}));
	};

	const toggleActivityDrawer = (
		isActivityDrawerOpen: boolean,
		activityLogsViewed: boolean
	) => {
		setState((prevState) => ({
			...prevState,
			isActivityDrawerOpen,
			activityLogsViewed,
		}));
	};

	const toggleRoleChangeDialog = () => {
		setState((prevState) => ({
			...prevState,
			isChangeRoleDialogOpen: !prevState.isChangeRoleDialogOpen,
			anchorEl: null,
		}));
	};

	const handleSelectDeviceModal = () => {
		setState((prevState) => ({
			...prevState,
			isSelectDeviceModalOpen: !prevState.isSelectDeviceModalOpen,
		}));
	};

	const handleCloseDeviceModal = () => {
		setState((prevState) => ({
			...prevState,
			isSelectDeviceModalOpen: !prevState.isSelectDeviceModalOpen,
		}));
	};

	const handleCloseSnack = (
		event: SyntheticEvent | MouseEvent,
		reason?: string
	) => {
		if (reason === 'clickaway') {
			return;
		}
		setState((prevState) => ({ ...prevState, isSnackOpen: false }));
	};

	const setCsrfToken = (csrfToken: string) =>
		setState((prevState) => ({ ...prevState, csrfToken: csrfToken }));

	const {
		// eslint-disable-next-line no-shadow
		selectedIndex,
		isMenuOpen,
		isSelectDeviceModalOpen,
		isActivityDrawerOpen,
		isChangeRoleDialogOpen,
		activityLogsViewed,
		isSnackOpen,
		snackMessage,
		csrfToken,
		currentRoleBasedAccess,
	} = state;

	return (
		<ComponentContext.Provider
			value={{
				isMenuOpen,
				selectedIndex,
				isSelectDeviceModalOpen,
				isActivityDrawerOpen,
				isChangeRoleDialogOpen,
				activityLogsViewed,
				setSelectedIndex,
				setMenuOpen,
				setDeviceModalOpen,
				handleSelectDeviceModal,
				handleCloseDeviceModal,
				toggleActivityDrawer,
				toggleRoleChangeDialog,
				setSnackMessage,
				handleCloseSnack,
				setOpenSnack,
				isSnackOpen,
				snackMessage,
				csrfToken,
				setCsrfToken,
				setCurrentRoleBasedAccess,
				currentRoleBasedAccess,
				...props,
			}}
		>
			{children}
		</ComponentContext.Provider>
	);
};

export { ComponentContext, ComponentProvider };
