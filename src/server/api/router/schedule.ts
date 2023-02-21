import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const scheduleRouter = createTRPCRouter({
	all: protectedProcedure
		.input(
			z.object({
				deviceId: z.string(),
			})
		)
		.query(async ({ input, ctx }) => {
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
		}),
	add: protectedProcedure
		.input(
			z.object({
				deviceId: z.string(),
				schedule: z.string().min(1),
			})
		)
		.mutation(async ({ ctx, input }) => {
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
		}),
	edit: protectedProcedure
		.input(
			z.object({
				id: z.string(),
				data: z.object({
					schedule: z.string().min(1),
					enabled: z.boolean().optional(),
				}),
			})
		)
		.mutation(async ({ ctx, input }) => {
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
		}),
	device: protectedProcedure
		.input(z.string())
		.mutation(async ({ input: id, ctx }) => {
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

			await ctx.prisma.schedule.delete({ where: { id } });
			return id;
		}),
});
