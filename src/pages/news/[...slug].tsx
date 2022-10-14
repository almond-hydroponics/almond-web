import fs from 'fs';

import generateRss from '@lib/generate-rss';
import {
	formatSlug,
	getAllFilesFrontMatter,
	getFileBySlug,
	getFiles,
} from '@lib/mdx';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import NewsArticle from 'views/NewsArticle';

import { AuthorFrontMatter } from '../../types/AuthorFrontMatter';
import { PostFrontMatter } from '../../types/PostFrontMatter';
import { Toc } from '../../types/Toc';
import Draft from '../../views/Draft';

const DEFAULT_LAYOUT = 'News';

export async function getStaticPaths() {
	const posts = getFiles('posts');
	return {
		paths: posts.map((post) => ({
			params: {
				slug: formatSlug(post).split('/'),
			},
		})),
		fallback: false,
	};
}

//@ts-expect-error
export const getStaticProps: GetStaticProps<{
	post: { mdxSource: string; toc: Toc; frontMatter: PostFrontMatter };
	authorDetails: AuthorFrontMatter[];
	prev?: { slug: string; title: string };
	next?: { slug: string; title: string };
}> = async ({ params }) => {
	const slug = (params?.slug as string[]).join('/');
	const allPosts = await getAllFilesFrontMatter('posts');
	const postIndex = allPosts.findIndex(
		(post) => formatSlug(post.slug) === slug
	);
	const prev: { slug: string; title: string } =
		allPosts[postIndex + 1] || null;
	const next: { slug: string; title: string } =
		allPosts[postIndex - 1] || null;
	const post = await getFileBySlug<PostFrontMatter>('posts', slug);
	// @ts-ignore
	const authorList = post.frontMatter.authors || ['default'];
	const authorPromise = authorList.map(async (author) => {
		const authorResults = await getFileBySlug<AuthorFrontMatter>('authors', [
			author,
		]);
		return authorResults.frontMatter;
	});
	const authorDetails = await Promise.all(authorPromise);

	// rss
	if (allPosts.length > 0) {
		const rss = generateRss(allPosts);
		fs.writeFileSync('./public/feed.xml', rss);
	}

	return {
		props: {
			post,
			authorDetails,
			prev,
			next,
		},
	};
};

export default function NewsArticlePage({
	post,
	authorDetails,
	prev,
	next,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
	const { mdxSource, toc, frontMatter } = post;

	return (
		<>
			{'draft' in frontMatter && frontMatter.draft !== true ? (
				<NewsArticle
					layout={DEFAULT_LAYOUT}
					toc={toc}
					mdxSource={mdxSource}
					frontMatter={frontMatter}
					authorDetails={authorDetails}
					prev={prev}
					next={next}
				/>
			) : (
				<Draft />
			)}
		</>
	);
}
