import { AnalyticsCard } from '@components/molecules';
import { ComponentContext } from '@context/ComponentContext';
import useNextSchedule from '@hooks/useNextSchedule';
import { useRandomColorPair } from '@hooks/useRandomColorPair';
import { trpc } from '@lib/trpc';
import {
	BlurOn,
	BubbleChart,
	HorizontalSplitTwoTone,
	MemoryTwoTone,
	OpacityTwoTone,
	ScheduleTwoTone,
} from '@mui/icons-material';
import { Box, Divider, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Device } from '@prisma/client';
import formatWaterLevelData from '@utils/formatWaterLevel';
import { useSession } from 'next-auth/react';
import { useContext } from 'react';
import { RoughNotation } from 'react-rough-notation';

import { getSchedulesQueryPathAndInput } from '../WaterCycleView';

const UserAnalyticsView = (): JSX.Element => {
	const { setSelectedIndex } = useContext(ComponentContext);
	const [deviceColor] = useRandomColorPair();

	const temperature = 27;
	const humidity = 50;
	const waterLevel = 400;

	const { data: session } = useSession();
	const device = (session?.user?.device as Device) || {
		name: '',
	};

	const schedulesQueryAndPath = getSchedulesQueryPathAndInput(
		String(device?.id)
	);
	const schedulesQuery = trpc.useQuery(schedulesQueryAndPath);
	const schedules = schedulesQuery.data?.schedules || [];

	const { nextTimeSchedule } = useNextSchedule(schedules);

	const handleCardClick = (index: number) => () => setSelectedIndex(index);

	const background = '/img/background_illustration.svg';

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
				Welcome to Almond Hydroponics!
			</Typography>
			<Typography marginTop={1} marginBottom={2} variant="body1" align="left">
				Your current device is{' '}
				<RoughNotation
					show
					type="highlight"
					animationDelay={250}
					animationDuration={2000}
					color={deviceColor}
				>
					{' '}
					{device?.name}
				</RoughNotation>
			</Typography>
			<Divider />
			<Typography marginTop={2} variant="body1" align="left">
				At a glance, here are the latest readings from your device with the
				next scheduled watering time.
			</Typography>
			<Grid marginTop={4} container item xs={12} spacing={1}>
				<AnalyticsCard
					onClick={handleCardClick(1)}
					colorClass="brownCard"
					icon={<ScheduleTwoTone fontSize="large" />}
					mainInfo="Next schedule"
					subInfo={nextTimeSchedule}
				/>
				<AnalyticsCard
					onClick={handleCardClick(1)}
					colorClass="blueCard"
					icon={<OpacityTwoTone fontSize="large" />}
					mainInfo="Water level"
					subInfo={`${formatWaterLevelData(waterLevel)} %`}
				/>
				<AnalyticsCard
					onClick={handleCardClick(1)}
					colorClass="yellowCard"
					icon={<HorizontalSplitTwoTone fontSize="large" />}
					mainInfo="Water temperature"
					subInfo={`${temperature ?? 0}\u00b0C`}
				/>
				<AnalyticsCard
					onClick={handleCardClick(2)}
					colorClass="tealCard"
					icon={<BlurOn fontSize="large" />}
					mainInfo="Air temperature"
					subInfo={`${temperature ?? 0}\u00b0C`}
				/>
				<AnalyticsCard
					onClick={handleCardClick(2)}
					colorClass="greenCard"
					icon={<BubbleChart fontSize="large" />}
					mainInfo="Air humidity"
					subInfo={`${humidity ?? 0} %`}
				/>
				<AnalyticsCard
					onClick={handleCardClick(3)}
					colorClass="purpleCard"
					icon={<MemoryTwoTone fontSize="large" />}
					mainInfo="Power usage"
					subInfo="3 kW"
				/>
			</Grid>
		</Box>
	);
};

export default UserAnalyticsView;
