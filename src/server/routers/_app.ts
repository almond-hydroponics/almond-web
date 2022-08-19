import superjson from 'superjson';

import { createRouter } from '../create-router';
import { deviceRouter } from './device';

export const appRouter = createRouter()
	.transformer(superjson)
	.merge('device.', deviceRouter);
// .merge('user.', userRouter);
// .merge('post.', postRouter)

export type AppRouter = typeof appRouter;
