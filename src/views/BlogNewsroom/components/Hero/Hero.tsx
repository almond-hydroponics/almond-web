import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Container from 'components/Container';

const Hero = (): JSX.Element => {
	const theme = useTheme();
	return (
		<Box
			sx={{
				width: 1,
				height: 1,
				overflow: 'hidden',
			}}
		>
			<Container
				zIndex={3}
				position={'relative'}
				minHeight={{ xs: 200, sm: 300, md: 350 }}
				maxHeight={400}
				display={'flex'}
				alignItems={'center'}
				justifyContent={'center'}
			>
				<Box width={1}>
					<Box marginBottom={2}>
						<Typography
							variant="h3"
							align={'center'}
							sx={{
								fontWeight: 600,
								color: theme.palette.common.white,
							}}
						>
							Adventures in the world of plant hydroponics
						</Typography>
					</Box>
					<Box>
						<Typography
							variant="h6"
							align={'center'}
							sx={{
								color: theme.palette.common.white,
							}}
						>
							Latest updates and Hand-picked resources.
						</Typography>
					</Box>
				</Box>
			</Container>
		</Box>
	);
};

export default Hero;
