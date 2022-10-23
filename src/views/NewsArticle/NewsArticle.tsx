import { Pre, TOCInline } from '@components/atoms';
import { Main } from '@layouts/index';
import { Typography } from '@mui/material';
import { ComponentMap, getMDXComponent } from 'mdx-bundler/client';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ComponentType, useMemo } from 'react';

import { CustomLink } from './components';

const Wrapper: ComponentType<{ layout: string }> = ({ layout, ...rest }) => {
	const Layout = dynamic(() => import(`../../layouts/${layout}`), {
		ssr: false,
	});
	return <Layout {...rest} />;
};

const CustomP = () => <p style={{ fontSize: '10px' }} />;

export const MDXComponents: ComponentMap = {
	Image,
	TOCInline,
	a: CustomLink,
	Typography,
	// p: CustomP,
	// @ts-expect-error
	pre: Pre,
	wrapper: Wrapper,
};

interface Props {
	mdxSource: string;

	[key: string]: unknown;
}

const NewsArticle = ({ layout, mdxSource, ...rest }: Props): JSX.Element => {
	const MdxComponent = useMemo(() => getMDXComponent(mdxSource), [mdxSource]);

	return (
		<Main>
			<MdxComponent layout={layout} components={MDXComponents} {...rest} />
		</Main>
	);
};

export default NewsArticle;
