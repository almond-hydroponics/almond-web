import { protectedProcedure, router } from '@/server/trpc/trpc';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const userRouter = router({
	profile: protectedProcedure
		.input(
			z.object({
				id: z.string(),
			})
		)
		.query(async ({ ctx, input }) => {
			const { id } = input;
			const user = await ctx.prisma.user.findUnique({
				where: { id },
				select: {
					id: true,
					name: true,
					image: true,
					devices: true,
				},
			});

			if (!user) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: `No profile with id '${id}'`,
				});
			}

			return user;
		}),
	edit: protectedProcedure
		.input(
			z.object({
				name: z.string().min(1),
			})
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.user.update({
				where: { id: ctx.session.user.id },
				data: {
					name: input.name,
				},
			});
		}),
	updateAvatar: protectedProcedure
		.input(
			z.object({
				image: z.string().nullish(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.user.update({
				where: { id: ctx.session.user.id },
				data: {
					image: input.image,
				},
			});
		}),
});
