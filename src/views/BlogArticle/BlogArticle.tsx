import { Main } from '@layouts/index';
import { Box, Typography } from '@mui/material';
import Container from 'components/Container';
import { MDXRemote } from 'next-mdx-remote';

import { FooterNewsletter, Hero } from './components';

const components = { Typography };

const BlogArticle = ({
	frontMatter: { title, date, avatar, thumbnailUrl, author },
	mdxSource,
}): JSX.Element => {
	return (
		<Main>
			<Box position={'relative'} zIndex={3}>
				<Hero
					avatar={avatar}
					fullName={author}
					date={date}
					title={title}
					featuredImage={thumbnailUrl}
				/>
				<Container maxWidth={{ sm: 720, md: 960 }}>
					<MDXRemote {...mdxSource} components={components} />
				</Container>
			</Box>
			<Box bgcolor={'alternate.main'}>
				<Container>
					<FooterNewsletter />
				</Container>
			</Box>
		</Main>
	);
};

export default BlogArticle;
