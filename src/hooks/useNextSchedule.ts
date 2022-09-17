import useEffectAsync from '@hooks/useEffectAsync';
import { Schedule } from '@prisma/client';
import arrayIsEmpty from '@utils/arrayIsEmpty';
import dayjs from '@utils/dayjsTime';
import { getDiff } from '@utils/validateTimeOneHour';
import { useState } from 'react';

const useNextSchedule = (schedules: Schedule[]) => {
	const [nextTimeSchedule, setNextTimeSchedule] = useState('00:00');

	useEffectAsync(async () => {
		if (!arrayIsEmpty(schedules)) {
			const filteredSchedules: Schedule[] = schedules.filter(
				(t) => Math.sign(getDiff(dayjs(), t.schedule)) > 0
			);

			if (arrayIsEmpty(filteredSchedules))
				filteredSchedules.push(...schedules);

			const nextTime = filteredSchedules.reduce((accumulator, current) => {
				const accumulatorDiff = getDiff(dayjs(), accumulator.schedule);
				const currentDiff = getDiff(dayjs(), current.schedule);
				return accumulatorDiff < currentDiff ? accumulator : current;
			});
			setNextTimeSchedule(() => nextTime.schedule);
		}
	}, [schedules]);

	return { nextTimeSchedule };
};

export default useNextSchedule;
