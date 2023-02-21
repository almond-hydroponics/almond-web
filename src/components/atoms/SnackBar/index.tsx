import { AlertProps, Snackbar, useMediaQuery } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
// third-party libraries
import { useTheme } from '@mui/material/styles';
import { reset } from '@/store/slices/snack';
// react libraries
import { forwardRef, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// interfaces
import { SnackMessageProps } from './interfaces';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
	props,
	ref
) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SnackBar = ({ snack }: SnackMessageProps): JSX.Element => {
	const [isSnackOpen, setSnackOpen] = useState(false);
	const [snackMessage, setSnackMessage] = useState('');

	const dispatch = useDispatch();
	const theme = useTheme();
	const isSm = useMediaQuery(theme.breakpoints.up('sm'), {
		defaultMatches: true,
	});
	const { message, severity } = snack;

	useEffect(() => {
		setSnackMessage(message);
		setSnackOpen(!!message);
	}, [message]);

	const handleCloseSnack = (
		event?: SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === 'clickaway') return;
		setSnackOpen(false);
		dispatch(reset());
	};

	return (
		<Snackbar
			anchorOrigin={
				isSm
					? { vertical: 'top', horizontal: 'center' }
					: { vertical: 'bottom', horizontal: 'center' }
			}
			open={isSnackOpen}
			autoHideDuration={6000}
			onClose={handleCloseSnack}
		>
			<div data-testid="snack-message">
				<Alert
					onClose={handleCloseSnack}
					severity={severity ?? 'success'}
					sx={{ bottom: { xs: isSm ? 'unset' : 90 }, width: '100%' }}
				>
					{snackMessage}
				</Alert>
			</div>
		</Snackbar>
	);
};

export default SnackBar;
