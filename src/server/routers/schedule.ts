import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { createProtectedRouter } from '../create-protected-router';

export const scheduleRouter = createProtectedRouter()
	.query('all', {
		input: z.object({
			deviceId: z.string(),
		}),
		async resolve({ input, ctx }) {
			const schedules = await ctx.prisma.schedule.findMany({
				orderBy: {
					createdAt: 'desc',
				},
				where: {
					deviceId: input.deviceId,
				},
				select: {
					id: true,
					schedule: true,
					enabled: true,
					deviceId: true,
					createdAt: true,
					updatedAt: true,
				},
			});

			const scheduleCount = await ctx.prisma.schedule.count();

			return {
				schedules,
				scheduleCount,
			};
		},
	})
	.mutation('add', {
		input: z.object({
			deviceId: z.string(),
			schedule: z.string().min(1),
		}),
		async resolve({ ctx, input }) {
			return await ctx.prisma.schedule.create({
				data: {
					schedule: input.schedule,
					device: {
						connect: {
							id: input.deviceId,
						},
					},
				},
			});
		},
	})
	.mutation('edit', {
		input: z.object({
			id: z.string(),
			data: z.object({
				schedule: z.string().min(1),
				enabled: z.boolean().optional(),
			}),
		}),
		async resolve({ ctx, input }) {
			const { id, data } = input;

			const schedule = await ctx.prisma.schedule.findUnique({
				where: { id },
				select: {
					device: {
						select: {
							id: true,
							userId: true,
						},
					},
				},
			});

			const scheduleBelongsToUser =
				schedule?.device?.userId === ctx.session.user.id;

			if (!scheduleBelongsToUser) {
				throw new TRPCError({ code: 'FORBIDDEN' });
			}

			return await ctx.prisma.schedule.update({
				where: { id },
				data: {
					schedule: data.schedule,
					enabled: data.enabled,
				},
			});
		},
	})
	.mutation('delete', {
		input: z.string(),
		async resolve({ input: id, ctx }) {
			const schedule = await ctx.prisma.schedule.findUnique({
				where: { id },
				select: {
					device: {
						select: {
							id: true,
							userId: true,
						},
					},
				},
			});

			const scheduleBelongsToUser =
				schedule?.device?.userId === ctx.session.user.id;

			if (!scheduleBelongsToUser) {
				throw new TRPCError({ code: 'FORBIDDEN' });
			}

			await ctx.prisma.device.delete({ where: { id } });
			return id;
		},
	});
