import { AnalyticsCard } from '@components/molecules';
// components
import { ComponentContext } from '@context/ComponentContext';
import {
	AccountBalanceTwoTone,
	AllOutTwoTone,
	DeviceHubTwoTone,
	GroupTwoTone,
	LibraryBooksTwoTone,
	ScheduleTwoTone,
} from '@mui/icons-material';
import { Box, Divider, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';

const background = '/img/background_illustration.svg';

const AdminAnalytics = (): JSX.Element => {
	const users = 69;
	const devices = 420;

	const { setSelectedIndex } = useContext(ComponentContext);
	const handleCardClick = (index: number) => () => setSelectedIndex(index);

	return (
		<Box
			data-testid="regular-analytics-page"
			sx={{
				backgroundImage: `url(${background})`,
				backgroundPositionX: 'center',
				backgroundRepeat: 'no-repeat',
			}}
		>
			<Typography variant="h5" align="left" fontWeight={600}>
				Welcome to the Admin side.
			</Typography>
			<Typography marginTop={1} marginBottom={2} variant="body1" align="left">
				Take a peek of what you can do here.
			</Typography>
			<Divider />
			<Typography marginTop={2} variant="body1" align="left">
				In summary, these are the latest stats from your system. Take time to
				monitor the different metrics of the client usage.
			</Typography>
			<Grid marginTop={4} container item xs={12} spacing={1}>
				<AnalyticsCard
					onClick={handleCardClick(1)}
					colorClass="blueCard"
					icon={<AllOutTwoTone fontSize="large" />}
					mainInfo="Devices"
					subInfo={devices}
				/>
				<AnalyticsCard
					onClick={handleCardClick(1)}
					colorClass="yellowCard"
					icon={<GroupTwoTone fontSize="large" />}
					mainInfo="People"
					subInfo={users}
				/>
				<AnalyticsCard
					onClick={handleCardClick(1)}
					colorClass="purpleCard"
					icon={<ScheduleTwoTone fontSize="large" />}
					mainInfo="Requests"
					subInfo="30"
				/>
				<AnalyticsCard
					onClick={handleCardClick(1)}
					colorClass="tealCard"
					icon={<AccountBalanceTwoTone fontSize="large" />}
					mainInfo="Sales"
					subInfo="4,000"
				/>
				<AnalyticsCard
					onClick={handleCardClick(2)}
					colorClass="greenCard"
					icon={<DeviceHubTwoTone fontSize="large" />}
					mainInfo="Units"
					subInfo="23"
				/>
				<AnalyticsCard
					onClick={handleCardClick(3)}
					colorClass="brownCard"
					icon={<LibraryBooksTwoTone fontSize="large" />}
					mainInfo="Orders"
					subInfo="3"
				/>
			</Grid>
		</Box>
	);
};

export default AdminAnalytics;
