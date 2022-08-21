import { AnalyticsCard } from '@components/molecules';
import { ComponentContext } from '@context/ComponentContext';
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
import { useContext, useState } from 'react';

const RegularUserAnalytics = (): JSX.Element => {
	const { setSelectedIndex } = useContext(ComponentContext);
	const temperature = 27;
	const humidity = 50;
	const waterLevel = 400;

	const [nextTimeSchedule, setNextTimeSchedule] = useState('00:00');

	const { data: session } = useSession();
	const devices = (session?.user?.devices as Device[]) || [
		{
			name: '',
		},
	];

	// useEffectAsync(async () => {
	// 	dispatch(
	// 		getAllSchedules(activeDevice._id ?? (activeDevice as unknown as string))
	// 	);
	// 	if (!isEmpty(schedules)) {
	// 		const filteredSchedules: Schedule[] = schedules.filter(
	// 			(t) => Math.sign(getDiff(dayjs(), t.schedule)) > 0
	// 		);
	//
	// 		if (isEmpty(filteredSchedules)) filteredSchedules.push(...schedules);
	//
	// 		const nextTime = filteredSchedules.reduce((accumulator, current) => {
	// 			const accumulatorDiff = getDiff(dayjs(), accumulator.schedule);
	// 			const currentDiff = getDiff(dayjs(), current.schedule);
	// 			return accumulatorDiff < currentDiff ? accumulator : current;
	// 		});
	// 		setNextTimeSchedule(() => nextTime.schedule);
	// 	}
	// }, [schedules]);

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
				Your current device is {devices[0]?.name}.
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

export default RegularUserAnalytics;
