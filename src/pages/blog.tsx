import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import BlogNewsroom from 'views/BlogNewsroom';
import { GetStaticProps } from 'next';

export default function BlogNewsroomPage({ posts }): JSX.Element {
	return <BlogNewsroom posts={posts} />;
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
	const files = fs.readdirSync(path.join('posts'));

	const posts = files.map((filename) => {
		const markdownWithMeta = fs.readFileSync(
			path.join('posts', filename),
			'utf-8'
		);
		const { data: frontMatter } = matter(markdownWithMeta);

		return {
			frontMatter,
			slug: filename.split('.')[0],
		};
	});

	return {
		props: {
			posts,
		},
	};
};
