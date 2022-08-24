import { DeviceTable } from '@layouts/Dashboard/components';
import { InferQueryPathAndInput, trpc } from '@lib/trpc';
import { Box, Tab, Tabs } from '@mui/material';
import { Device } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { ReactNode, SyntheticEvent, useState } from 'react';

interface TabPanelProps {
	children?: ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 0 }}>{children}</Box>}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const getDevicesQueryPathAndInput = (
	userId: string
): InferQueryPathAndInput<'device.mine'> => {
	return ['device.mine', { userId }];
};

const DeviceTabs = (): JSX.Element => {
	const [value, setValue] = useState(0);

	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const { data: session } = useSession();
	const { id } = session?.user || {};

	const devicesQueryAndPath = getDevicesQueryPathAndInput(String(id));
	const devicesQuery = trpc.useQuery(devicesQueryAndPath);
	const devices = devicesQuery.data?.devices || [];

	const serializeDeviceStatus = (
		device: Pick<Device, 'verified' | 'active'>
	) => {
		const { verified, active } = device;
		if (!verified) return 'not-verified';
		if (!active) return 'inactive';
		return 'active';
	};

	const headers = ['', 'Name', 'Identifier', ''];

	return (
		<Box sx={{ width: '100%' }}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs value={value} onChange={handleChange} aria-label="device tabs">
					<Tab label="Recent" {...a11yProps(0)} />
					<Tab label="Starred" {...a11yProps(1)} />
					<Tab label="All" {...a11yProps(2)} />
				</Tabs>
			</Box>
			<TabPanel value={value} index={0}>
				<DeviceTable headers={headers} data={devices as unknown as Device[]} />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<DeviceTable
					headers={headers}
					data={
						devices.filter((device) => device.starred) as unknown as Device[]
					}
				/>
			</TabPanel>
			<TabPanel value={value} index={2}>
				<DeviceTable headers={headers} data={devices as unknown as Device[]} />
			</TabPanel>
		</Box>
	);
};

export default DeviceTabs;
