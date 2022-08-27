import { markdownToHtml } from '@lib/editor';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { createProtectedRouter } from '../create-protected-router';

export const postRouter = createProtectedRouter()
	.query('feed', {
		input: z
			.object({
				take: z.number().min(1).max(50).optional(),
				skip: z.number().min(1).optional(),
				authorId: z.string().optional(),
			})
			.optional(),
		async resolve({ input, ctx }) {
			const take = input?.take ?? 50;
			const skip = input?.skip;
			const where = {
				published: ctx.isUserAdmin ? undefined : false,
				authorId: input?.authorId,
			};

			const posts = await ctx.prisma.post.findMany({
				take,
				skip,
				orderBy: {
					createdAt: 'desc',
				},
				where,
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

			const postCount = await ctx.prisma.post.count({
				where,
			});

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
					author: {
						select: {
							id: true,
							name: true,
							image: true,
						},
					},
				},
			});

			const postBelongsToUser = post?.author?.id === ctx.session.user.id;

			if (
				!post ||
				(post.published && !postBelongsToUser && !ctx.isUserAdmin)
			) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: `No post with id '${id}'`,
				});
			}

			return post;
		},
	})
	.mutation('add', {
		input: z.object({
			title: z.string().min(1),
			content: z.string().min(1),
		}),
		async resolve({ ctx, input }) {
			return await ctx.prisma.post.create({
				data: {
					title: input.title,
					content: input.content,
					contentHtml: markdownToHtml(input.content),
					author: {
						connect: {
							id: ctx.session.user.id,
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
				title: z.string().min(1),
				content: z.string().min(1),
			}),
		}),
		async resolve({ ctx, input }) {
			const { id, data } = input;

			const post = await ctx.prisma.post.findUnique({
				where: { id },
				select: {
					author: {
						select: {
							id: true,
						},
					},
				},
			});

			const postBelongsToUser = post?.author?.id === ctx.session.user.id;

			if (!postBelongsToUser) {
				throw new TRPCError({ code: 'FORBIDDEN' });
			}

			return await ctx.prisma.post.update({
				where: { id },
				data: {
					title: data.title,
					content: data.content,
					contentHtml: markdownToHtml(data.content),
				},
			});
		},
	})
	.mutation('delete', {
		input: z.string(),
		async resolve({ input: id, ctx }) {
			const post = await ctx.prisma.post.findUnique({
				where: { id },
				select: {
					author: {
						select: {
							id: true,
						},
					},
				},
			});

			const postBelongsToUser = post?.author?.id === ctx.session.user.id;

			if (!postBelongsToUser) {
				throw new TRPCError({ code: 'FORBIDDEN' });
			}

			await ctx.prisma.post.delete({ where: { id } });
			return id;
		},
	})
	.mutation('publish', {
		input: z.string(),
		async resolve({ input: id, ctx }) {
			if (!ctx.isUserAdmin) {
				throw new TRPCError({ code: 'FORBIDDEN' });
			}

			return await ctx.prisma.post.update({
				where: { id },
				data: {
					published: true,
				},
				select: {
					id: true,
				},
			});
		},
	})
	.mutation('unpublish', {
		input: z.string(),
		async resolve({ input: id, ctx }) {
			if (!ctx.isUserAdmin) {
				throw new TRPCError({ code: 'FORBIDDEN' });
			}

			return await ctx.prisma.post.update({
				where: { id },
				data: {
					published: false,
				},
				select: {
					id: true,
				},
			});
		},
	});
