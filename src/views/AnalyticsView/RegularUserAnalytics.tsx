import { AnalyticsCard } from '@components/molecules';
import { ComponentContext } from '@context/ComponentContext';
// interfaces
// components
import {
	BlurOn,
	BubbleChart,
	HorizontalSplitTwoTone,
	MemoryTwoTone,
	OpacityTwoTone,
	ScheduleTwoTone,
} from '@mui/icons-material';
import { Grid } from '@mui/material';
import formatWaterLevelData from '@utils/formatWaterLevel';
import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';

const RegularUserAnalytics = (): JSX.Element => {
	const { setSelectedIndex } = useContext(ComponentContext);
	// const { temperature, humidity, waterLevel } = useSelector(
	// 	(globalState: IRootState) => globalState.sensorData.sensorData
	// );
	// const { schedules } = useSelector(
	// 	(globalState: IRootState) => globalState.timeSchedules
	// );
	const temperature = 27;
	const humidity = 50;
	const waterLevel = 400;

	const schedules = [];

	const [nextTimeSchedule, setNextTimeSchedule] = useState('00:00');
	const dispatch = useDispatch();

	const isEmpty = (arr) => !Array.isArray(arr) || arr.length === 0;

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

	return (
		<div data-testid="regular-analytics-page">
			<Grid container item xs={12} spacing={1}>
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
					onClick={handleCardClick(1)}
					colorClass="brownCard"
					icon={<ScheduleTwoTone fontSize="large" />}
					mainInfo="Next schedule"
					subInfo={nextTimeSchedule}
				/>
				<AnalyticsCard
					onClick={handleCardClick(2)}
					colorClass="redCard"
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
		</div>
	);
};

export default RegularUserAnalytics;
