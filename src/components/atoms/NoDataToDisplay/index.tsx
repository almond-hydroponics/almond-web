import { Box, Typography } from '@mui/material';
import { NoDataIllustration } from '@svg/illustrations';

const NoDataToDisplay = (): JSX.Element => (
	<Box
		sx={{
			position: 'absolute',
			top: '30%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
		}}
	>
		<Box>
			<NoDataIllustration />
		</Box>
		<Typography>Sorry! No data to display.</Typography>
	</Box>
);

export default NoDataToDisplay;
