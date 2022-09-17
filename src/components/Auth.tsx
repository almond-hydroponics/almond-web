import { displaySnackMessage } from '@store/slices/snack';
import isBrowser from '@utils/isBrowser';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Auth = ({ children }: { children: ReactNode }) => {
	const { push, pathname } = useRouter();
	const dispatch = useDispatch();
	const { data: session, status } = useSession();
	const isUser = !!session?.user;

	useEffect(() => {
		if (status === 'loading') return; // Do nothing while loading
		if (status === 'unauthenticated') {
			push('/');
			// 	.then(() =>
			// 	dispatch(
			// 		displaySnackMessage({
			// 			message: 'Kindly login to view this page.',
			// 		})
			// 	)
			// );
		}
	}, [isUser, status]);

	useEffect(() => {
		if (session?.error === 'RefreshAccessTokenError') {
			signOut().then(() => {
				dispatch(
					displaySnackMessage({
						message: 'Your token has expired. Kindly login to continue.',
					})
				);
			});
		}
	}, [session?.user?.email]);

	useEffect(() => {
		if (
			isBrowser &&
			pathname.includes('admin') &&
			session?.user?.role !== 'ADMIN'
		) {
			push('/').then(() =>
				dispatch(
					displaySnackMessage({
						message: 'You need to be an admin to view this page.',
						severity: 'error',
					})
				)
			);
		}
	}, [pathname, isBrowser]);

	if (isUser) {
		return <>{children}</>;
	}

	return null;
};

export default Auth;
