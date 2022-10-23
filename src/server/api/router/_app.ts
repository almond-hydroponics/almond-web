import { deviceRouter } from '@/server/trpc/router/device';
import { scheduleRouter } from '@/server/trpc/router/schedule';
import { userRouter } from '@/server/trpc/router/user';

import { router } from '../trpc';
import { authRouter } from './auth';

export const appRouter = router({
	auth: authRouter,
	device: deviceRouter,
	schedule: scheduleRouter,
	user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
