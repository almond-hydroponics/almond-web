import { TOCInline } from '@components/atoms';
import { BlogSEO } from '@components/atoms/SEO';
import Container from '@components/Container';
import { Hero } from '@layouts/News/components';
//import { Hero } from '@layouts/News/components';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ReactNode } from 'react';
import { AuthorFrontMatter } from 'types/AuthorFrontMatter';
import { PostFrontMatter } from 'types/PostFrontMatter';
import { Toc } from 'types/Toc';

import siteMetadata from '../../../data/siteMetadata';

interface Props {
	frontMatter: PostFrontMatter;
	authorDetails: AuthorFrontMatter[];
	next?: { slug: string; title: string };
	prev?: { slug: string; title: string };
	toc?: Toc;
	children: ReactNode;
}

const News = ({
	frontMatter,
	authorDetails,
	next,
	prev,
	toc,
	children,
}: Props): JSX.Element => {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});
	const isSm = useMediaQuery(theme.breakpoints.down('sm'), {
		defaultMatches: true,
	});

	const { slug, date, title, tags, readingTime, images } = frontMatter;

	const banner = images?.[0];

	const url = `${siteMetadata.siteUrl}/post/${slug}`;

	return (
		<>
			<BlogSEO url={url} authorDetails={authorDetails} {...frontMatter} />
			<Box component={'article'} position={'relative'} minHeight={'100vh'}>
				<Hero
					avatar={authorDetails[0]?.avatar}
					date={date}
					featuredImage={banner as string}
					fullName={authorDetails[0]?.name}
					title={title}
					readingTime={readingTime?.text}
				/>
				<Box height={1}>
					<Container maxWidth={{ sm: 720, md: 960 }}>
						<TOCInline toc={toc as Toc} asDisclosure />
						{children}
					</Container>
				</Box>
			</Box>
		</>
	);
};

export default News;
