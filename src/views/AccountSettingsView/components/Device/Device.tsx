import { trpc } from '@/lib/trpc';
import {
	Avatar,
	Box,
	Chip,
	Divider,
	Grid,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSession } from 'next-auth/react';

import { Form } from '../../../EnterDeviceIdView/components';

const Device = (): JSX.Element => {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	const { data: session } = useSession();
	const { id } = session?.user || {};

	const profileQueryPathAndInput = getProfileQueryPathAndInput(String(id));
	const profileQuery = trpc.user.useQuery(profileQueryPathAndInput);

	const devices = profileQuery?.data?.devices || [];

	return (
		<Box>
			<Typography variant="h5" color="text.primary" fontWeight={600}>
				Add new device
			</Typography>
			<Box paddingY={2}>
				<Divider />
			</Box>

			<Grid
				container
				spacing={4}
				justifyContent={isMd ? 'flex-start' : 'center'}
				direction={isMd ? 'row' : 'column-reverse'}
				alignItems={isMd ? 'flex-start' : 'center'}
			>
				<Grid item xs={12} md={6}>
					<Typography
						variant="subtitle2"
						color="text.secondary"
						fontWeight={400}
						paddingBottom={2}
						gutterBottom
					>
						The device ID will help you to control your purchased device from
						Almond. Kindly enter the 6 digit figure to start using your system.
						Configuration with the device might take a few minutes.
					</Typography>
					<Form />
				</Grid>
				<Grid
					item
					container
					justifyContent={isMd ? 'flex-start' : 'center'}
					xs={12}
					md={6}
				>
					{devices.map((device) => (
						<Chip
							sx={{
								margin: 0.5,
								color: '#3E4E56',
								backgroundColor: '#D9E9BA',
								fontWeight: 500,
							}}
							key={device.id}
							label={device.name}
							avatar={
								<Avatar
									sx={{
										backgroundColor: '#3E4E56',
										color: '#FFFFFF !important',
									}}
								>
									{devices.indexOf(device) + 1}
								</Avatar>
							}
						/>
					))}
				</Grid>
			</Grid>
		</Box>
	);
};

export default Device;
