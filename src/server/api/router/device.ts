import {
	adminProcedure,
	protectedProcedure,
	router,
} from '@/server/trpc/trpc';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const deviceRouter = router({
	all: adminProcedure
		.input(
			z
				.object({
					userId: z.string().optional(),
				})
				.optional()
		)
		.query(async ({ ctx }) => {
			const devices = await ctx.prisma.device.findMany({
				orderBy: {
					createdAt: 'desc',
				},
				select: {
					id: true,
					identifier: true,
					name: true,
					verified: true,
					active: true,
					starred: true,
					online: true,
					createdAt: true,
					user: {
						select: {
							id: true,
							name: true,
						},
					},
				},
			});

			const deviceCount = await ctx.prisma.device.count();

			return {
				devices,
				deviceCount,
			};
		}),
	mine: protectedProcedure
		.input(
			z.object({
				userId: z.string(),
			})
		)
		.query(async ({ input, ctx }) => {
			const devices = await ctx.prisma.device.findMany({
				orderBy: {
					createdAt: 'desc',
				},
				where: { userId: input.userId },
				select: {
					id: true,
					identifier: true,
					name: true,
					verified: true,
					active: true,
					starred: true,
					online: true,
					createdAt: true,
					user: {
						select: {
							id: true,
							name: true,
						},
					},
				},
			});

			const deviceCount = await ctx.prisma.device.count();

			return {
				devices,
				deviceCount,
			};
		}),
	userDevices: protectedProcedure
		.input(
			z
				.object({
					userId: z.string().optional(),
				})
				.optional()
		)
		.query(async ({ input, ctx }) => {
			const where = {
				userId: input?.userId,
			};

			const devices = await ctx.prisma.device.findMany({
				orderBy: {
					createdAt: 'desc',
				},
				where,
				select: {
					id: true,
					name: true,
					verified: true,
					active: true,
					starred: true,
					createdAt: true,
					user: {
						select: {
							id: true,
							name: true,
							image: true,
						},
					},
				},
			});

			const deviceCount = await ctx.prisma.device.count({
				where,
			});

			return {
				devices,
				deviceCount,
			};
		}),
	detail: protectedProcedure
		.input(
			z.object({
				id: z.string(),
			})
		)
		.query(async ({ ctx, input }) => {
			const { id } = input;
			const device = await ctx.prisma.device.findUnique({
				where: { id },
				select: {
					id: true,
					name: true,
					active: true,
					verified: true,
					createdAt: true,
					user: {
						select: {
							id: true,
							name: true,
							image: true,
						},
					},
					schedule: {
						orderBy: {
							createdAt: 'asc',
						},
						select: {
							id: true,
							schedule: true,
							enabled: true,
							createdAt: true,
						},
					},
				},
			});

			const deviceBelongsToUser = device?.user?.id === ctx.session.user.id;

			if (
				!device ||
				(!deviceBelongsToUser && ctx.session.user.role !== 'ADMIN')
			) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: `No device with id '${id}'`,
				});
			}

			return device;
		}),
	add: adminProcedure
		.input(
			z.object({
				identifier: z.string().min(1).max(8),
			})
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.device.create({
				data: {
					identifier: input.identifier,
					name: input.identifier,
				},
			});
		}),
	edit: adminProcedure
		.input(
			z.object({
				id: z.string(),
				data: z.object({
					name: z.string().min(1).max(8).optional(),
					verified: z.boolean().optional(),
					active: z.boolean().optional(),
					starred: z.boolean().optional(),
				}),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { id, data } = input;

			const device = await ctx.prisma.device.findUnique({
				where: { id },
				select: {
					user: {
						select: {
							id: true,
						},
					},
				},
			});

			if (!device) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: 'Device not found',
				});
			}
			const deviceBelongsToUser = device?.user?.id === ctx.session.user.id;

			if (!deviceBelongsToUser && ctx.session.user.role !== 'ADMIN') {
				throw new TRPCError({ code: 'FORBIDDEN' });
			}

			return await ctx.prisma.device.update({
				where: { id },
				data: {
					name: data.name,
					verified: data.verified,
					active: data.active,
					starred: data.starred,
				},
			});
		}),
	verify: protectedProcedure
		.input(
			z.object({
				identifier: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { identifier } = input;

			const device = await ctx.prisma.device.findUnique({
				where: { id: identifier },
				select: {
					id: true,
					verified: true,
				},
			});

			if (!device) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message:
						'Device does not exist. Kindly confirm your ID to continue or contact support for provisioning.',
				});
			}

			const deviceHasBeenTaken = device?.verified === true;

			if (deviceHasBeenTaken) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'Device has already been taken',
				});
			}

			return await ctx.prisma.device.update({
				where: { id: device?.id },
				data: {
					verified: true,
					userId: ctx.session.user.id,
				},
			});
		}),
	activate: protectedProcedure
		.input(
			z.object({
				id: z.string().optional(),
				identifier: z.string().optional(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { id, identifier } = input;

			const device = await ctx.prisma.device.findFirstOrThrow({
				where: {
					OR: [
						{
							id,
						},
						{
							identifier,
						},
					],
				},
				select: {
					id: true,
					active: true,
					userId: true,
				},
			});

			if (device?.userId !== ctx.session.user.id) {
				throw new TRPCError({
					code: 'FORBIDDEN',
					message: 'You can only activate your own device.',
				});
			}

			if (device?.active) return;

			await ctx.prisma.device.update({
				where: { id },
				data: {
					active: true,
				},
			});

			return await ctx.prisma.device.updateMany({
				where: {
					id: {
						not: id,
					},
				},
				data: {
					active: false,
				},
			});
		}),
	delete: adminProcedure
		.input(z.string())
		.mutation(async ({ input: id, ctx }) => {
			await ctx.prisma.device.delete({ where: { id } });
			return id;
		}),
});
