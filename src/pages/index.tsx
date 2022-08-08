import { GetServerSideProps } from 'next';
import { getCsrfToken } from 'next-auth/react';
import IndexView from 'views/IndexView';

const IndexPage = ({ csrfToken }): JSX.Element => {
	return <IndexView csrfToken={csrfToken} />;
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
	// const files = fs.readdirSync(path.join('posts'));
	//
	// const posts = files.map((filename) => {
	// 	const markdownWithMeta = fs.readFileSync(
	// 		path.join('posts', filename),
	// 		'utf-8'
	// 	);
	// 	const { data: frontMatter } = matter(markdownWithMeta);
	//
	// 	return {
	// 		frontMatter,
	// 		slug: filename.split('.')[0],
	// 	};
	// });

	return {
		props: {
			// posts,
			csrfToken: await getCsrfToken(context),
		},
	};
};

// export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
// 	const files = fs.readdirSync(path.join('posts'));
//
// 	const posts = files.map((filename) => {
// 		const markdownWithMeta = fs.readFileSync(
// 			path.join('posts', filename),
// 			'utf-8'
// 		);
// 		const { data: frontMatter } = matter(markdownWithMeta);
//
// 		return {
// 			frontMatter,
// 			slug: filename.split('.')[0],
// 		};
// 	});
//
// 	return {
// 		props: {
// 			posts,
// 		},
// 	};
// };
