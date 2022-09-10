import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const SideMenu = (): JSX.Element => {
	const theme = useTheme();

	return (
		<Box
			position={'sticky'}
			top={theme.spacing(10)}
			className={'sticky'}
			flex={'1 1 30%'}
			maxWidth={'30%'}
			// maxHeight={'100vh'}
			border={`1px solid ${theme.palette.divider}`}
		>
			<Box
				display={'flex'}
				alignItems={'center'}
				height={1}
				width={1}
				sx={{
					'& .lazy-load-image-loaded': {
						height: 1,
						width: 1,
					},
				}}
			>
				<Box
					component={LazyLoadImage}
					height={1}
					width={1}
					src={'https://assets.maccarianagency.com/backgrounds/img23.jpg'}
					alt="..."
					effect="blur"
					sx={{
						objectFit: 'cover',
						'& .lazy-load-image-loaded': {
							height: 1,
						},
					}}
				/>
			</Box>
			{/*<Stack*/}
			{/*	direction="column"*/}
			{/*	justifyContent="center"*/}
			{/*	alignItems="flex-end"*/}
			{/*	spacing={2}*/}
			{/*>*/}
			{/*	<Box padding={{ xs: 2, sm: 3 }}>*/}
			{/*		<Typography variant={'subtitle2'}>*/}
			{/*			Nairobi 20143*/}
			{/*			<br />*/}
			{/*			Kenya*/}
			{/*		</Typography>*/}
			{/*	</Box>*/}
			{/*	<Box padding={{ xs: 2, sm: 3 }}>*/}
			{/*		<Typography variant={'subtitle2'}>*/}
			{/*			Nairobi 20143*/}
			{/*			<br />*/}
			{/*			Kenya*/}
			{/*		</Typography>*/}
			{/*	</Box>*/}
			{/*	<Box padding={{ xs: 2, sm: 3 }}>*/}
			{/*		<Typography variant={'subtitle2'}>*/}
			{/*			Nairobi 20143*/}
			{/*			<br />*/}
			{/*			Kenya*/}
			{/*		</Typography>*/}
			{/*	</Box>*/}
			{/*</Stack>*/}
		</Box>
	);
};

export default SideMenu;
