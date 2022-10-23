import { authRouter } from '@server/api/router/auth';
import { deviceRouter } from '@server/api/router/device';
import { scheduleRouter } from '@server/api/router/schedule';
import { userRouter } from '@server/api/router/user';

import { createTRPCRouter } from './trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
	auth: authRouter,
	device: deviceRouter,
	schedule: scheduleRouter,
	user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
