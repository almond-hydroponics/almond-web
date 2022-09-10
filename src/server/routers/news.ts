import { createRouter } from '@server/create-router';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const newsRouter = createRouter()
	.query('feed', {
		input: z
			.object({
				take: z.number().min(1).max(50).optional(),
				skip: z.number().min(1).optional(),
			})
			.optional(),
		async resolve({ input, ctx }) {
			const take = input?.take ?? 50;
			const skip = input?.skip;

			const posts = await ctx.prisma.post.findMany({
				take,
				skip,
				orderBy: {
					createdAt: 'desc',
				},
				select: {
					id: true,
					title: true,
					contentHtml: true,
					createdAt: true,
					published: true,
					thumbnailUrl: true,
					author: {
						select: {
							id: true,
							name: true,
							image: true,
						},
					},
				},
			});

			const postCount = await ctx.prisma.post.count();

			return {
				posts,
				postCount,
			};
		},
	})
	.query('detail', {
		input: z.object({
			id: z.string(),
		}),
		async resolve({ ctx, input }) {
			const { id } = input;
			const post = await ctx.prisma.post.findUnique({
				where: { id },
				select: {
					id: true,
					title: true,
					content: true,
					contentHtml: true,
					createdAt: true,
					published: true,
					thumbnailUrl: true,
					author: {
						select: {
							id: true,
							name: true,
							image: true,
						},
					},
				},
			});

			if (!post || post.published) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: `No post with id '${id}'`,
				});
			}

			return post;
		},
	});
