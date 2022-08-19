import { markdownToHtml } from '@/lib/editor';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { createProtectedRouter } from '../create-protected-router';

export const deviceRouter = createProtectedRouter()
	.mutation('add', {
		input: z.object({
			postId: z.number(),
			name: z.string().min(1),
		}),
		async resolve({ ctx, input }) {
			return await ctx.prisma.device.create({
				data: {
					name: input.name,
					author: {
						connect: {
							id: ctx.session.user.id,
						},
					},
					post: {
						connect: {
							id: input.postId,
						},
					},
				},
			});
		},
	})
	.mutation('edit', {
		input: z.object({
			id: z.number(),
			data: z.object({
				content: z.string().min(1),
			}),
		}),
		async resolve({ ctx, input }) {
			const { id, data } = input;

			const comment = await ctx.prisma.comment.findUnique({
				where: { id },
				select: {
					author: {
						select: {
							id: true,
						},
					},
				},
			});

			const commentBelongsToUser = comment?.author.id === ctx.session.user.id;

			if (!commentBelongsToUser) {
				throw new TRPCError({ code: 'FORBIDDEN' });
			}

			const updatedComment = await ctx.prisma.comment.update({
				where: { id },
				data: {
					content: data.content,
					contentHtml: markdownToHtml(data.content),
				},
			});

			return updatedComment;
		},
	})
	.mutation('delete', {
		input: z.number(),
		async resolve({ input: id, ctx }) {
			const comment = await ctx.prisma.comment.findUnique({
				where: { id },
				select: {
					author: {
						select: {
							id: true,
						},
					},
				},
			});

			const commentBelongsToUser = comment?.author.id === ctx.session.user.id;

			if (!commentBelongsToUser) {
				throw new TRPCError({ code: 'FORBIDDEN' });
			}

			await ctx.prisma.comment.delete({ where: { id } });
			return id;
		},
	});
