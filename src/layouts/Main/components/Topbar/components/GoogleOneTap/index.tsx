import useOneTapSignin from '@hooks/useOneTapSignIn';
import { Box } from '@mui/material';

const GoogleOneTap = () => {
	const { isLoading: oneTapIsLoading } = useOneTapSignin({
		redirect: false,
		parentContainerId: 'oneTap',
	});

	return (
		<Box
			id="oneTap"
			style={{
				position: 'absolute',
				top: '50px',
				right: '0',
			}}
		/>
	);
};

export default GoogleOneTap;
