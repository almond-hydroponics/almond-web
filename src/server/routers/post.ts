import { markdownToHtml } from '@lib/editor';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { createProtectedRouter } from '../create-protected-router';

export const postRouter = createProtectedRouter()
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
					thumbnailUrl: '/img/hydroponics.webp',
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
