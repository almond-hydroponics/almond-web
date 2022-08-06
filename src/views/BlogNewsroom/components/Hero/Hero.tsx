import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useTheme } from '@mui/material/styles';

import Container from 'components/Container';

const Hero = (): JSX.Element => {
	const theme = useTheme();
	return (
		<Box
			position={'relative'}
			sx={{
				backgroundImage: 'url("/img/hydroponics.webp")',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				marginTop: -13,
				paddingTop: 13,
				'&:after': {
					position: 'absolute',
					content: '" "',
					width: '100%',
					height: '100%',
					top: 0,
					right: 0,
					bottom: 0,
					left: 0,
					zIndex: 1,
					background: '#161c2d',
					opacity: 0.6,
				},
			}}
		>
			<Container
				zIndex={3}
				position={'relative'}
				minHeight={{ xs: 300, sm: 400, md: 500 }}
				maxHeight={600}
				display={'flex'}
				alignItems={'center'}
				justifyContent={'center'}
			>
				<Box width={1}>
					<Box marginBottom={2}>
						<Typography
							variant="h2"
							align={'center'}
							sx={{
								fontWeight: 700,
								color: theme.palette.common.white,
							}}
						>
							Hear from almond newsroom
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
