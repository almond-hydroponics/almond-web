import { DataTable } from '@components/molecules';
import {
	skeletonColumns,
	skeletonRows,
} from '@components/molecules/SkeletonLoader';
import { InferQueryPathAndInput, trpc } from '@lib/trpc';
import { Box, Chip, Grid, Stack, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
// components
import { GridCellParams, GridColDef } from '@mui/x-data-grid';
import { Device } from '@prisma/client';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { FormStateProps } from '../../types/FormStateProps';
// interfaces
import { DeviceManagementState } from './interfaces';

// third-party libraries

const schema = {
	device: {
		presence: { allowEmpty: false, message: 'is required' },
		length: {
			is: 8,
			message: 'id should be 8 characters',
		},
	},
};

const getDevicesQueryPathAndInput = (
	userId: string
): InferQueryPathAndInput<'device.all'> => {
	return ['device.all', { userId }];
};

export const DeviceManagementView = (): JSX.Element => {
	const [state, setState] = useState<DeviceManagementState & FormStateProps>({
		devices: [],
		isEditMode: false,
		showDeviceModal: false,
		isFormModalOpen: false,
		isDeleteModalOpen: false,
		deviceId: '',
		deviceToEdit: '',
		selectedDevice: '',
		isValid: false,
		values: {},
		touched: {},
		errors: {},
	});

	const theme = useTheme();
	const isSm = useMediaQuery(theme.breakpoints.down('sm'), {
		defaultMatches: true,
	});

	const { data: session } = useSession();
	const { id } = session?.user || {};

	const devicesQueryAndPath = getDevicesQueryPathAndInput(String(id));
	const devicesQuery = trpc.useQuery(devicesQueryAndPath);
	const devices = devicesQuery.data?.devices || [];

	// const dispatch = useDispatch();
	//
	// const handleDeviceUploadState = () => {
	// 	axios
	// 		.get('http://192.168.0.13/restart')
	// 		/* eslint-disable no-console */
	// 		.then((r) => console.log(r))
	// 		.catch((e) => console.error(e));
	// 	/* eslint-enable no-console */
	// };
	//
	// const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
	// 	event.persist();
	// 	const { name, value } = event.target;
	// 	setState((prevState) => ({
	// 		...prevState,
	// 		values: {
	// 			...prevState.values,
	// 			[name]: value,
	// 		},
	// 		touched: {
	// 			...prevState.touched,
	// 			[name]: true,
	// 		},
	// 	}));
	// };
	//
	// const showDeviceModal = (mode) => (event) => {
	// 	if (`show${mode}DeviceModal` && mode === 'Add') {
	// 		setState((prevState) => ({
	// 			...state,
	// 			showDeviceModal: !prevState.showDeviceModal,
	// 			isFormModalOpen: !prevState.isFormModalOpen,
	// 			isEditMode: false,
	// 		}));
	// 	} else if (`show${mode}ScheduleModal` && mode === 'Edit') {
	// 		const { id } = event.target;
	// 		const device = devices.filter((obj) => obj._id === id);
	//
	// 		setState((prevState) => ({
	// 			...state,
	// 			deviceId: id,
	// 			deviceToEdit: device[0].id,
	// 			showDeviceModal: !prevState.showDeviceModal,
	// 			isFormModalOpen: !prevState.isFormModalOpen,
	// 			isEditMode: true,
	// 		}));
	// 	}
	// };
	//
	// const closeDeviceModal = (): void => {
	// 	setState((prevState) => ({
	// 		...state,
	// 		deviceToEdit: '',
	// 		showDeviceModal: !prevState.showDeviceModal,
	// 		isFormModalOpen: !prevState.isFormModalOpen,
	// 		deviceId: '',
	// 		device: '',
	// 	}));
	// };
	//
	// const toggleDeviceDeleteModal = (): void =>
	// 	setState((prevState) => ({
	// 		...prevState,
	// 		isDeleteModalOpen: !prevState.isDeleteModalOpen,
	// 	}));
	//
	// const handleDeviceDelete = useCallback(
	// 	(event: MouseEvent<HTMLElement>) => {
	// 		event.preventDefault();
	// 		dispatch(deleteDevice(state.deviceId));
	// 		toggleDeviceDeleteModal();
	// 	},
	// 	[state.deviceId] // eslint-disable-line react-hooks/exhaustive-deps
	// );
	//
	// const onAddEditDeviceSubmit = (event: FormEvent<HTMLFormElement>) => {
	// 	event.preventDefault();
	// 	const { isEditMode, deviceId, isValid, values } = state;
	//
	// 	if (isValid) {
	// 		const deviceToSubmit = {
	// 			id: values.device,
	// 		};
	// 		dispatch(
	// 			isEditMode
	// 				? editDevice(deviceId, deviceToSubmit)
	// 				: addNewDevice(deviceToSubmit)
	// 		);
	// 	}
	//
	// 	setState((prevState) => ({
	// 		...prevState,
	// 		touched: {
	// 			...prevState.touched,
	// 			...prevState.errors,
	// 		},
	// 	}));
	//
	// 	closeDeviceModal();
	// };
	//
	// const hasError = (field: string): boolean =>
	// 	!!(state.touched[field] && state.errors[field]);
	//
	const renderActionButtons = (device: Device): JSX.Element => {
		const { id } = device;

		const handleDelete = () => {
			setState((prevState) => ({
				...prevState,
				deviceId: id,
				isDeleteModalOpen: !prevState.isDeleteModalOpen,
			}));
		};

		return (
			<Stack direction="row" spacing={1} key={id}>
				<Typography
					style={{ cursor: 'pointer', paddingRight: 12 }}
					id={id}
					variant="body2"
					color="primary"
					// onClick={showDeviceModal('Edit')}
					// onKeyDown={showDeviceModal('Edit')}
				>
					Edit
				</Typography>
				<Typography
					style={{ cursor: 'pointer', color: red[900] }}
					id={id}
					variant="body2"
					onClick={handleDelete}
					onKeyDown={handleDelete}
				>
					Delete
				</Typography>
			</Stack>
		);
	};

	const renderDeviceStatus = (device): JSX.Element => {
		const { verified, enabled } = device;
		if (!verified)
			return (
				<Chip
					size="small"
					sx={{
						color: '#1967d2',
						backgroundColor: '#e8f0fe',
						fontWeight: 500,
					}}
					label="Not Verified"
				/>
			);
		if (!enabled)
			return (
				<Chip
					size="small"
					sx={{
						color: '#980910',
						backgroundColor: '#F9E3E3',
						fontWeight: 500,
					}}
					label="Disabled"
				/>
			);
		return (
			<Chip
				size="small"
				sx={{ backgroundColor: '#D9E9BA', color: '#3E4E56', fontWeight: 500 }}
				label="Enabled"
			/>
		);
	};

	const deviceColorStatus = (device): string[] => {
		const { verified, enabled } = device;
		if (!verified) return ['#1967d2', '#e8f0fe'];
		if (!enabled) return ['#980910', '#F9E3E3'];
		return ['#3E4E56', '#D9E9BA'];
	};

	const tableStyles = {
		border: 0,
		WebkitFontSmoothing: 'auto',
		'& .MuiDataGridIconSeparator': {
			display: 'none',
		},
		'& .MuiDataGridCell:focusWithin': {
			// outline: 'solid #1967D2 0.8px',
			outlineOffset: '-1px',
			outline: 'none',
		},
		// '& .MuiDataGrid-colCell, .MuiDataGrid-cell': {
		// 	paddingLeft: 2,
		// 	paddingRight: 2,
		// },
		'& .MuiPaginationItemRoot': {
			borderRadius: 0,
		},
		'& .tableHeader': {
			color: theme.palette.primary.main,
			// fontWeight: 500,
		},
		'& .tableCell': {
			fontWeight: 500,
			fontSize: 14,
		},
		'& .MuiDataGridCell': {
			fontSize: 12,
			[theme.breakpoints.down('sm')]: {
				fontSize: 12,
			},
		},
	};

	// const renderTableContent = (): JSX.Element => {
	// 	const columns: GridColDef[] = [
	// 		{
	// 			field: 'deviceId',
	// 			headerName: 'Device',
	// 			// width: 100,
	// 			flex: 0.1,
	// 			headerClassName: 'table-header',
	// 		},
	// 		{
	// 			field: 'id',
	// 			headerName: 'Device ID',
	// 			// width: 100,
	// 			flex: 0.2,
	// 			headerClassName: 'table-header',
	// 		},
	// 		{
	// 			field: 'user',
	// 			headerName: 'User',
	// 			flex: 0.15,
	// 			headerClassName: 'table-header',
	// 		},
	// 		{
	// 			field: 'status',
	// 			headerName: 'Status',
	// 			flex: 0.1,
	// 			headerClassName: 'table-header',
	// 			renderCell: ({ value }: GridCellParams) => renderDeviceStatus(value),
	// 		},
	// 		{
	// 			field: 'actions',
	// 			headerName: 'Actions',
	// 			flex: 0.1,
	// 			headerClassName: 'table-header',
	// 			renderCell: ({ value }: GridCellParams) =>
	// 				renderActionButtons(value as Device),
	// 		},
	// 	];
	//
	// 	const rows = devices.map((device) => ({
	// 		id: device?._id ?? 'No ID',
	// 		deviceId: device?.id ?? 'No device',
	// 		user: device?.user
	// 			? `${device?.user?.firstName} ${device?.user?.lastName}`
	// 			: 'NOT ASSIGNED',
	// 		status: device,
	// 		actions: device,
	// 	}));
	//
	// 	return (
	// 		<div style={{ height: 700, width: '100%' }}>
	// 			<div style={{ display: 'flex', height: '100%' }}>
	// 				<div style={{ flexGrow: 1 }}>
	// 					<DataGrid
	// 						// autoHeight
	// 						// autoPageSize
	// 						// pagination
	// 						disableColumnMenu
	// 						style={{ ...tableStyles }}
	// 						// className={tableClasses.root}
	// 						loading={isLoading}
	// 						rows={rows}
	// 						pageSize={10}
	// 						columns={columns.map((column) => ({
	// 							...column,
	// 							disableClickEventBubbling: true,
	// 						}))}
	// 						// components={{
	// 						// 	LoadingOverlay: CustomLoadingOverlay,
	// 						// 	NoRowsOverlay: NoDataOverlay,
	// 						// }}
	// 						sortModel={[
	// 							{
	// 								field: 'deviceId',
	// 								sort: 'asc' as GridSortDirection,
	// 							},
	// 							{
	// 								field: 'user',
	// 								sort: 'asc' as GridSortDirection,
	// 							},
	// 						]}
	// 					/>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	);
	// };

	// const renderDeviceForm = (): JSX.Element => {
	// 	const { isEditMode, values } = state;
	// 	return (
	// 		<TextField
	// 			autoFocus
	// 			fullWidth
	// 			id="device"
	// 			variant="outlined"
	// 			type="text"
	// 			name="device"
	// 			// margin="dense"
	// 			// size="small"
	// 			label={`${isEditMode ? 'Update' : 'Add new'} device ID`}
	// 			value={values.device ?? ''}
	// 			onChange={handleValueChange}
	// 			error={hasError('device')}
	// 			helperText={hasError('device') ? state.errors.device[0] : null}
	// 			// InputLabelProps={{
	// 			// 	classes: {
	// 			// 		focused: {}
	// 			// 	},
	// 			// }}
	// 			InputProps={{
	// 				startAdornment: (
	// 					<InputAdornment position="start">
	// 						<IconButton>
	// 							<PhonelinkSetupSharp />
	// 						</IconButton>
	// 					</InputAdornment>
	// 				),
	// 			}}
	// 		/>
	// 	);
	// };

	// const renderAddEditDeviceModal = () => {
	// 	const { isFormModalOpen, isEditMode, isValid } = state;
	// 	return (
	// 		<Modal
	// 			isModalOpen={isFormModalOpen}
	// 			renderContent={renderDeviceForm()}
	// 			onClose={closeDeviceModal}
	// 			renderDialogText={
	// 				isEditMode
	// 					? 'Change the device identifier for the user to configure.'
	// 					: 'Add a 7 digit device identifier for the user to configure.'
	// 			}
	// 			renderHeader={isEditMode ? 'Update device' : 'Add new device'}
	// 			submitButtonName={isEditMode ? 'Update device' : 'Create new device'}
	// 			onSubmit={onAddEditDeviceSubmit}
	// 			onDismiss={closeDeviceModal}
	// 			disabled={!isValid}
	// 		/>
	// 	);
	// };
	//
	// const renderDeleteDeviceModal = (): JSX.Element => (
	// 	<Modal
	// 		isModalOpen={state.isDeleteModalOpen}
	// 		renderDialogText="Do you confirm deletion of device?"
	// 		onClose={toggleDeviceDeleteModal}
	// 		renderHeader="Delete Device"
	// 		submitButtonName="Delete"
	// 		onSubmit={handleDeviceDelete}
	// 		onDismiss={toggleDeviceDeleteModal}
	// 	/>
	// );

	// const renderDeviceCards = (): JSX.Element => (
	// 	<Grid container spacing={1}>
	// 		{devices.map((device) => (
	// 			<Grid item xs={6} md={4} key={fancyId()}>
	// 				<Box
	// 					component={Card}
	// 					variant={'outlined'}
	// 					sx={{
	// 						padding: 0,
	// 						borderColor: alpha(deviceColorStatus(device)[0], 0.2),
	// 						color: deviceColorStatus(device)[0],
	// 						backgroundColor: deviceColorStatus(device)[1],
	// 					}}
	// 				>
	// 					<Box
	// 						component={CardContent}
	// 						display={'flex'}
	// 						alignItems={'center'}
	// 						paddingBottom="16px !important"
	// 					>
	// 						<Box
	// 							display={'flex'}
	// 							flexDirection={{ xs: 'column', sm: 'row' }}
	// 							flex={'1 1 100%'}
	// 							justifyContent={{ sm: 'space-between' }}
	// 							alignItems={{ sm: 'center' }}
	// 						>
	// 							<Typography
	// 								variant={'body1'}
	// 								fontWeight={600}
	// 								fontSize={14}
	// 								sx={{ marginBottom: { xs: 0, sm: 0 } }}
	// 							>
	// 								{device?.id ?? 'No device'}
	// 							</Typography>
	// 							<Typography
	// 								variant={'subtitle2'}
	// 								color={'text.primary'}
	// 								sx={{ marginBottom: { xs: 0, sm: 0 } }}
	// 							>
	// 								{device?.user
	// 									? `${device?.user?.firstName} ${device?.user?.lastName}`
	// 									: 'NOT ASSIGNED'}
	// 							</Typography>
	// 						</Box>
	// 						{/*<Box marginLeft={2} color={'primary.main'}>*/}
	// 						{/*	{renderActionButtons(device)}*/}
	// 						{/*</Box>*/}
	// 					</Box>
	// 				</Box>
	// 			</Grid>
	// 		))}
	// 	</Grid>
	// );

	const columns: GridColDef[] = [
		{
			field: 'id',
			headerName: 'Device ID',
			minWidth: 250,
		},
		{
			field: 'name',
			headerName: 'Name',
			minWidth: 150,
		},
		{
			field: 'user',
			headerName: 'User',
			minWidth: 200,
		},
		{
			field: 'status',
			headerName: 'Status',
			minWidth: 150,
			cellClassName: ({ value }: GridCellParams<string>) => {
				return clsx('data-cell-grid', {
					verify: value === 'not-verified',
					inactive: value === 'inactive',
					active: value === 'active',
				});
			},
		},
		{
			field: 'actions',
			headerName: 'Actions',
			minWidth: 150,
			renderCell: ({ value }: GridCellParams) =>
				renderActionButtons(value as Device),
		},
	];

	const serializeDeviceStatus = (
		device: Pick<Device, 'verified' | 'active'>
	) => {
		const { verified, active } = device;
		if (!verified) return 'not-verified';
		if (!active) return 'inactive';
		return 'active';
	};

	const rows = devices.map((device) => ({
		id: device?.id ?? 'No ID',
		name: device?.name ?? 'No device',
		user: device?.user?.name ?? 'Not assigned',
		status: serializeDeviceStatus(device),
		actions: device,
	}));

	return (
		<Box sx={{ flexGrow: 1 }}>
			<Grid
				container
				direction="row"
				justifyContent="center"
				alignItems="stretch"
				spacing={2}
			>
				<Grid item xs={12} sm={8}>
					<Box
						bgcolor={'background.paper'}
						sx={{
							border: '1px solid #dadce0',
							borderRadius: 2,
						}}
					>
						<DataTable
							rows={!devices ? skeletonRows(columns) : rows}
							columns={!devices ? skeletonColumns(columns) : columns}
						/>
					</Box>
				</Grid>
				<Grid item xs>
					<Stack
						direction="column"
						justifyContent="center"
						alignItems="stretch"
						spacing={2}
					>
						<Box
							bgcolor={'background.paper'}
							sx={{
								border: '1px solid #dadce0',
								borderRadius: 2,
							}}
						>
							<DataTable
								rows={!devices ? skeletonRows(columns) : rows}
								columns={!devices ? skeletonColumns(columns) : columns}
							/>
						</Box>
						{/*<Box*/}
						{/*	bgcolor={'background.paper'}*/}
						{/*	sx={{*/}
						{/*		border: '1px solid #dadce0',*/}
						{/*		borderRadius: 2,*/}
						{/*	}}*/}
						{/*>*/}
						{/*	<DataTable*/}
						{/*		rows={!devices ? skeletonRows(columns) : rows}*/}
						{/*		columns={!devices ? skeletonColumns(columns) : columns}*/}
						{/*	/>*/}
						{/*</Box>*/}
					</Stack>
				</Grid>
			</Grid>
		</Box>
	);
};

export default DeviceManagementView;
