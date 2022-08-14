import CustomAvatar from '@components/molecules/CustomAvatar';
// components
import { ArrowBackRounded } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';

const Topbar = (): JSX.Element => {
	const router = useRouter();
	const theme = useTheme();

	return (
		<Box
			display={'flex'}
			justifyContent={'space-between'}
			alignItems={'center'}
		>
			<Box
				sx={{ display: 'flex' }}
				alignItems={'center'}
				onClick={router.back}
			>
				<IconButton style={{ marginRight: theme.spacing(1) }} color="primary">
					<ArrowBackRounded className="learn-more-link__arrow" />
				</IconButton>
				<Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
					Back
				</Typography>
			</Box>
			<Box>
				<CustomAvatar />
			</Box>
		</Box>
	);
};

export default Topbar;
