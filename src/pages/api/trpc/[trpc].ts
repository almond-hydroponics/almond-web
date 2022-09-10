import prisma from '@lib/prisma';
import { createContext } from '@server/context';
import { appRouter } from '@server/routers/_app';
import * as trpcNext from '@trpc/server/adapters/next';

export default trpcNext.createNextApiHandler({
	router: appRouter,
	createContext,
	teardown: () => prisma.$disconnect(),
	onError({ error }) {
		if (error.code === 'INTERNAL_SERVER_ERROR') {
			// send to bug reporting
			console.error('Something went wrong', error);
		}
	},
	batching: {
		enabled: true,
	},
});
