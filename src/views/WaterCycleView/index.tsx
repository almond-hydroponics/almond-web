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
import clsx from 'clsx';
import { useSession } from 'next-auth/react';

import WaterTable from './components/WaterTable';

const getDevicesQueryPathAndInput = (
	userId: string
): InferQueryPathAndInput<'device.all'> => {
	return ['device.all', { userId }];
};

export const WaterScheduleView = (): JSX.Element => {
	const theme = useTheme();
	const isSm = useMediaQuery(theme.breakpoints.down('sm'), {
		defaultMatches: true,
	});

	const { data: session } = useSession();
	const { id } = session?.user || {};

	const devicesQueryAndPath = getDevicesQueryPathAndInput(String(id));
	const devicesQuery = trpc.useQuery(devicesQueryAndPath);
	const devices = devicesQuery.data?.devices || [];

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
	const data = [
		{
			id: '1',
			schedule: '12.00pm',
			enabled: true,
			deviceId: 'blah',
			createdAt: '12.00pm',
			updatedAt: '12.00pm',
		},
		{
			id: '2',
			schedule: '12.00pm',
			enabled: true,
			deviceId: 'blah',
			createdAt: '12.00pm',
			updatedAt: '12.00pm',
		},
		{
			id: '3',
			schedule: '12.00pm',
			enabled: false,
			deviceId: 'blah',
			createdAt: '12.00pm',
			updatedAt: '12.00pm',
		},
	];

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
			<Button startIcon={<Add />} sx={{ paddingX: 0 }}>
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
						{/*  @ts-expect-error */}
						<WaterTable headers={headers} data={data} />
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
						<Typography paddingX={2} variant="h4">
							46%
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
		</Box>
	);
};

export default WaterScheduleView;
