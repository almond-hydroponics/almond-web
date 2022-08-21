import { createRouter } from '@server/create-router';
import { deviceRouter } from '@server/routers/device';
import { postRouter } from '@server/routers/post';
import { scheduleRouter } from '@server/routers/schedule';
import { userRouter } from '@server/routers/user';
import superjson from 'superjson';

export const appRouter = createRouter()
	.transformer(superjson)
	.merge('device.', deviceRouter)
	.merge('schedule.', scheduleRouter)
	.merge('user.', userRouter)
	.merge('post.', postRouter);

export type AppRouter = typeof appRouter;
