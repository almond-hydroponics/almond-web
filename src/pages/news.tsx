import Container from '@components/Container';
import { Main } from '@layouts/index';
import { NextPageWithAuthAndLayout } from '@lib/types';
import { ReactElement } from 'react';
import NewsroomView from 'views/NewsroomView';

const NewsroomPage: NextPageWithAuthAndLayout = (): JSX.Element => {
	return <NewsroomView />;
};

NewsroomPage.auth = false;

NewsroomPage.getLayout = function getLayout(page: ReactElement) {
	return (
		<Main>
			<Container
				maxWidth={{ sm: 720, md: 960 }}
				paddingY={{ xs: 4, sm: 6, md: 2 }}
			>
				{page}
			</Container>
		</Main>
	);
};

export default NewsroomPage;

// export const getStaticProps: GetStaticProps = async () => {
// 	const posts = await prisma.post.findMany({
// 		where: { published: true },
// 		include: {
// 			author: true,
// 		},
// 	});
//
// 	return {
// 		props: {
// 			posts: JSON.parse(JSON.stringify(posts)),
// 		},
// 	};
// };
