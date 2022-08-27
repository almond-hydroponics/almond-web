import { Main } from '@layouts/index';
import { ReactElement } from 'react';
import HomeView from 'views/HomeView';

const HomePage = (): JSX.Element => {
	return <HomeView />;
};

HomePage.getLayout = function getLayout(page: ReactElement) {
	return <Main>{page}</Main>;
};

export default HomePage;

// export const getServerSideProps: GetServerSideProps = async (context) => {
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
