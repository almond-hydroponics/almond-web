import { User } from '@prisma/client';
import type { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

export type NextPageWithAuthAndLayout = NextPage & {
	auth?: boolean;
	getLayout?: (page: ReactElement) => ReactNode;
};

export type Author = Pick<User, 'id' | 'name' | 'image'>;
