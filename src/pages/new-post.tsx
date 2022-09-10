import { Main } from '@layouts/index';
import { NextPageWithAuthAndLayout } from '@lib/types';
import { ReactElement } from 'react';

import NewPostView from '../views/NewPostView';

const NewPostPage: NextPageWithAuthAndLayout = (): JSX.Element => {
	return <NewPostView />;
};

NewPostPage.auth = true;

NewPostPage.getLayout = function getLayout(page: ReactElement) {
	return <Main>{page}</Main>;
};

export default NewPostPage;
