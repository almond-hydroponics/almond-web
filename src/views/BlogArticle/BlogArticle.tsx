import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import dayjs from '@utils/dayjsTime';
import Container from 'components/Container';
import Main from 'layouts/Main';
import { MDXRemote } from 'next-mdx-remote';
import SyntaxHighlighter from 'react-syntax-highlighter';

import { Content, FooterNewsletter, Hero, SimilarStories } from './components';

const components = { Typography };

const BlogArticle = ({
	frontMatter: { title, date, avatar, thumbnailUrl },
	mdxSource,
}): JSX.Element => {
	const theme = useTheme();

	const fullName = 'Anonymous';
	// const formattedDate = dayjs(post?.date).fromNow();
	// const image = post?.featuredImage.node.sourceUrl;

	return (
		<Main colorInvert={true}>
			<Box>
				<Hero
					avatar={avatar}
					fullName={fullName}
					date={date}
					title={title}
					featuredImage={thumbnailUrl}
				/>
				<Container maxWidth={{ sm: 720, md: 960 }}>
					<MDXRemote {...mdxSource} components={components} />
					{/*<Content*/}
					{/*	content={post?.content}*/}
					{/*	avatar={avatar}*/}
					{/*	fullName={fullName}*/}
					{/*	date={formattedDate}*/}
					{/*/>*/}
				</Container>
			</Box>
			<Box bgcolor={'alternate.main'}>
				<Container>
					<SimilarStories />
				</Container>
				<Container>
					<FooterNewsletter />
				</Container>
			</Box>
		</Main>
	);
};

export default BlogArticle;
