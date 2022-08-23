import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { createProtectedRouter } from '../create-protected-router';

export const deviceRouter = createProtectedRouter()
	.query('all', {
		input: z
			.object({
				userId: z.string().optional(),
			})
			.optional(),
		async resolve({ input, ctx }) {
			if (!ctx.isUserAdmin) {
				throw new TRPCError({ code: 'FORBIDDEN' });
			}

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

			const deviceCount = await ctx.prisma.device.count();

			return {
				devices,
				deviceCount,
			};
		},
	})
	.query('userDevices', {
		input: z
			.object({
				userId: z.string().optional(),
			})
			.optional(),
		async resolve({ input, ctx }) {
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
		},
	})
	.query('detail', {
		input: z.object({
			id: z.string(),
		}),
		async resolve({ ctx, input }) {
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

			if (!device || (!deviceBelongsToUser && !ctx.isUserAdmin)) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: `No device with id '${id}'`,
				});
			}

			return device;
		},
	})
	.mutation('add', {
		input: z.object({
			identifier: z.string().min(1).max(8),
		}),
		async resolve({ ctx, input }) {
			return await ctx.prisma.device.create({
				data: {
					identifier: input.identifier,
					name: input.identifier,
				},
			});
		},
	})
	.mutation('edit', {
		input: z.object({
			id: z.string(),
			data: z.object({
				name: z.string().min(1).max(8),
				verified: z.boolean(),
				active: z.boolean(),
			}),
		}),
		async resolve({ ctx, input }) {
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

			const deviceBelongsToUser = device?.user?.id === ctx.session.user.id;

			if (!deviceBelongsToUser) {
				throw new TRPCError({ code: 'FORBIDDEN' });
			}

			return await ctx.prisma.device.update({
				where: { id },
				data: {
					name: data.name,
					verified: data.verified,
					active: data.active,
				},
			});
		},
	})
	.mutation('verify', {
		input: z.object({
			identifier: z.string(),
		}),
		async resolve({ ctx, input }) {
			const { identifier } = input;

			const device = await ctx.prisma.device.findUnique({
				where: { identifier },
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
					active: true,
					userId: ctx.session.user.id,
				},
			});
		},
	})
	.mutation('delete', {
		input: z.string(),
		async resolve({ input: id, ctx }) {
			await ctx.prisma.device.delete({ where: { id } });
			return id;
		},
	});
