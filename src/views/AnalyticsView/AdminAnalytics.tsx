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
import { Grid } from '@mui/material';
import { useContext } from 'react';

const AdminAnalytics = (): JSX.Element => {
	const users = 69;
	const devices = 420;

	const { setSelectedIndex } = useContext(ComponentContext);
	const handleCardClick = (index: number) => () => setSelectedIndex(index);

	return (
		<div data-testid="admin-analytics-page">
			<Grid container item xs={12} spacing={1}>
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
					colorClass="redCard"
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
		</div>
	);
};

export default AdminAnalytics;
