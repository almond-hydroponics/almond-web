import { DataTable, DonutDisplay } from '@components/molecules';
import {
	skeletonColumns,
	skeletonRows,
} from '@components/molecules/SkeletonLoader';
import { InferQueryPathAndInput, trpc } from '@lib/trpc';
import { Add, KeyboardArrowDown } from '@mui/icons-material';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
// components
import { GridCellParams, GridColDef } from '@mui/x-data-grid';
import { Device } from '@prisma/client';
import { displaySnackMessage } from '@store/slices/snack';
import dayjs from '@utils/dayjsTime';
import {
	validateEditOneHourTime,
	validateNewOneHourTime,
} from '@utils/validateTimeOneHour';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import AddEditScheduleModal from './components/AddEditScheduleModal';
import WaterTable from './components/WaterTable';

const getDevicesQueryPathAndInput = (
	userId: string
): InferQueryPathAndInput<'device.all'> => {
	return ['device.all', { userId }];
};

export const getSchedulesQueryPathAndInput = (
	deviceId: string
): InferQueryPathAndInput<'schedule.all'> => {
	return ['schedule.all', { deviceId }];
};

export const WaterScheduleView = (): JSX.Element => {
	const [isScheduleModalVisible, setScheduleModalVisibility] =
		useState<boolean>(false);
	const [isEditMode, setEditScheduleMode] = useState<boolean>(false);
	const [scheduleId, setScheduleId] = useState<string>('');
	const [scheduleToEdit, setScheduleToEdit] = useState<string>('');
	const [hasError, setScheduleError] = useState<boolean>(false);
	const [selectedTimeSchedule, setSelectedTimeSchedule] = useState<any>(
		dayjs()
	);

	const theme = useTheme();
	const dispatch = useDispatch();
	const isSm = useMediaQuery(theme.breakpoints.down('sm'), {
		defaultMatches: true,
	});

	const { data: session } = useSession();
	const { id, device } = session?.user || {};
	const utils = trpc.useContext();

	const schedulesQueryAndPath = getSchedulesQueryPathAndInput(
		String(device?.id)
	);
	const schedulesQuery = trpc.useQuery(schedulesQueryAndPath);
	const schedules = schedulesQuery.data?.schedules || [];

	const devicesQueryAndPath = getDevicesQueryPathAndInput(String(id));
	const devicesQuery = trpc.useQuery(devicesQueryAndPath);
	const devices = devicesQuery.data?.devices || [];

	const addScheduleMutation = trpc.useMutation('schedule.add', {
		onSuccess: () => {
			return utils.invalidateQueries(
				getSchedulesQueryPathAndInput(String(device?.id))
			);
		},
		onError: (error) => {
			dispatch(
				displaySnackMessage({
					message: `Something went wrong: ${error.message}`,
					severity: 'error',
				})
			);
		},
	});

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
	}));

	const headers = ['', 'Schedule', 'Actions'];
	// const data = [
	// 	{
	// 		id: '1',
	// 		schedule: '12.00pm',
	// 		enabled: true,
	// 		deviceId: 'blah',
	// 		createdAt: '12.00pm',
	// 		updatedAt: '12.00pm',
	// 	},
	// 	{
	// 		id: '2',
	// 		schedule: '12.00pm',
	// 		enabled: true,
	// 		deviceId: 'blah',
	// 		createdAt: '12.00pm',
	// 		updatedAt: '12.00pm',
	// 	},
	// 	{
	// 		id: '3',
	// 		schedule: '12.00pm',
	// 		enabled: false,
	// 		deviceId: 'blah',
	// 		createdAt: '12.00pm',
	// 		updatedAt: '12.00pm',
	// 	},
	// ];

	const validateAddEditTime = (value) => {
		let scheduleIsNotWithinHour;
		const timeSchedules = schedules.map((schedule) => schedule?.schedule);

		if (isEditMode) {
			scheduleIsNotWithinHour = validateEditOneHourTime(
				schedules,
				scheduleId,
				value
			);
		} else {
			scheduleIsNotWithinHour = validateNewOneHourTime(timeSchedules, value);
		}
		setScheduleError(() => !scheduleIsNotWithinHour);
	};

	const validateScheduleOnOpen = (): void => {
		validateAddEditTime('Edit');
	};

	const handleAddTimeSchedule = (value) => {
		validateAddEditTime(value);
		setSelectedTimeSchedule(() => value);
	};

	const handleEditTimeChange = (value): void => {
		setScheduleToEdit(() => value);
		validateAddEditTime(value);
	};

	const showScheduleModal =
		(mode: string) =>
		(event): void => {
			event.preventDefault();
			const { id } = event.target;
			const schedule = schedules.filter((obj) => obj.id === id);
			const setEditTimeValue = (time) => {
				const [hour, minute] = time.split(':');
				return dayjs().hour(hour).minute(minute).format();
			};

			switch (mode) {
				case 'Add':
					setScheduleModalVisibility((prevState) => !prevState);
					setEditScheduleMode(false);
					break;
				case 'Edit':
					setScheduleId(() => id);
					setScheduleModalVisibility((prevState) => !prevState);
					setEditScheduleMode(false);
					setScheduleToEdit(() => setEditTimeValue(schedule[0].schedule));
					break;
				default:
					setScheduleId(() => '');
			}
			validateScheduleOnOpen();
		};

	// onSubmit={(values) => {
	// 	addPostMutation.mutate(
	// 		{
	// 			title: values.title,
	// 			content: values.content,
	// 			thumbnailUrl: uploadedThumbnailImage,
	// 		},
	// 		{
	// 			onSuccess: (data) => router.push(`/news/${data.id}`),
	// 		}
	// 	);
	// }}

	const closeScheduleModal = (): void => {
		setScheduleModalVisibility((prevState) => !prevState);

		setTimeout(() => {
			setSelectedTimeSchedule(() => dayjs());
			setScheduleError(() => false);
			setEditScheduleMode(() => false);
			setScheduleId(() => '');
		}, 1000);
	};

	const onAddEditScheduleSubmit = (event): void => {
		event.preventDefault();
		const timeValueString = (value) => dayjs(value).format('HH:mm');

		const schedule = {
			schedule: isEditMode
				? timeValueString(scheduleToEdit)
				: timeValueString(selectedTimeSchedule),
			deviceId: device?.id as string,
		};

		addScheduleMutation.mutate(schedule, {
			onSuccess: () => closeScheduleModal(),
		});

		// dispatch(
		// 	isEditMode
		// 		? editSchedule(scheduleId, schedule)
		// 		: addNewSchedule(schedule),
		// );

		// isLoading === false && closeScheduleModal();
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				spacing={2}
			>
				<Typography variant="h6" align="left" fontWeight={500}>
					Water cycles analysis
				</Typography>
				<Button endIcon={<KeyboardArrowDown />}>27 Jul - 23 Aug 2022</Button>
			</Stack>
			<Button
				startIcon={<Add />}
				sx={{ paddingX: 0 }}
				onClick={showScheduleModal('Add')}
			>
				Add schedule
			</Button>
			<Grid
				container
				direction="row"
				justifyContent="center"
				alignItems="flex-start"
				spacing={2}
				paddingTop={isSm ? 'unset' : 6}
			>
				<Grid item xs={12} sm={3} maxHeight={'61.8vh'}>
					<Box
						bgcolor={'background.paper'}
						sx={{
							border: '1px solid #dadce0',
							borderRadius: 2,
							paddingY: 2,
						}}
					>
						<Typography
							color="primary"
							paddingX={2}
							variant="body1"
							// fontWeight={400}
						>
							Next schedule
						</Typography>
						<Typography paddingX={2} variant="h4">
							21:00am
						</Typography>
						<WaterTable headers={headers} data={schedules} />
					</Box>
				</Grid>
				<Grid item xs={12} sm={3}>
					<Box
						bgcolor={'background.paper'}
						maxHeight={'61.8vh'}
						minHeight={'61.8vh'}
						sx={{
							border: '1px solid #dadce0',
							borderRadius: 2,
							paddingY: 2,
						}}
					>
						<Typography
							color="primary"
							paddingX={2}
							variant="body1"
							// fontWeight={500}
						>
							Water level
						</Typography>
						<Typography paddingX={2} variant="body2" color="text.secondary">
							This shows how much you are remaining on the plant consumption of
							nutrients and water. You may need to keep it at slightly above
							20% to last for about a week or two.
						</Typography>
						<DonutDisplay />
						{/*<DonutHigh />*/}
					</Box>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Box
						bgcolor={'background.paper'}
						maxHeight={'61.8vh'}
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
			</Grid>
			<AddEditScheduleModal
				isOpen={isScheduleModalVisible}
				isLoading={false}
				hasError={hasError}
				onDismiss={closeScheduleModal}
				isEditMode={isEditMode}
				onSubmit={onAddEditScheduleSubmit}
				onChange={isEditMode ? handleEditTimeChange : handleAddTimeSchedule}
				value={isEditMode ? scheduleToEdit : selectedTimeSchedule}
			/>
		</Box>
	);
};

export default WaterScheduleView;
