import { GetStaticPaths, GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import BlogArticle from 'views/BlogArticle';
import { serialize } from 'next-mdx-remote/serialize';

export default function BlogArticlePage({
	frontMatter,
	mdxSource,
	slug,
}): JSX.Element {
	const router = useRouter();
	if (!router.isFallback && !slug) {
		return <ErrorPage statusCode={404} />;
	}

	return <BlogArticle frontMatter={frontMatter} mdxSource={mdxSource} />;
}

// @ts-expect-error
export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
	const markdownWithMeta = fs.readFileSync(
		path.join('posts', slug + '.mdx'),
		'utf-8'
	);
	const { data: frontMatter, content } = matter(markdownWithMeta);
	const mdxSource = await serialize(content);

	return {
		props: {
			frontMatter,
			slug,
			mdxSource,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const files = fs.readdirSync(path.join('posts'));

	const paths = files.map((filename) => ({
		params: {
			slug: filename.replace('.mdx', ''),
		},
	}));

	return {
		paths,
		fallback: false,
	};
};
