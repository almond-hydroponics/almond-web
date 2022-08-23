import { Link } from '@components/atoms';
import Container from '@components/Container';
import { colors } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { alpha, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const Hero = (): JSX.Element => {
	const theme = useTheme();
	const LeftSide = () => (
		<>
			<Box marginBottom={2}>
				<Typography variant="h3" color="text.primary" sx={{ fontWeight: 700 }}>
					<Typography color={'primary'} component={'span'} variant={'inherit'}>
						Experience your food{' '}
					</Typography>
					<br />
					like never before.
				</Typography>
			</Box>
			<Box marginBottom={3}>
				<Typography
					variant="h6"
					component="p"
					color="text.secondary"
					fontWeight={400}
				>
					Offer available until the end of November:
				</Typography>
				<Typography
					variant="h3"
					color="text.primary"
					sx={{ fontWeight: 700, color: colors.red[400] }}
				>
					Ksh10,000
				</Typography>
				<Button
					component={Link}
					variant="contained"
					color="primary"
					size="large"
					href="/store"
					sx={{ marginTop: 2 }}
				>
					Discover our offer
				</Button>
			</Box>
			<Box
				paddingX={2}
				paddingY={1}
				bgcolor={alpha(theme.palette.primary.main, 0.1)}
				borderRadius={2}
			>
				<Typography variant="body1" component="p">
					Ksh200 for our strawberry package grown from us.*
				</Typography>
			</Box>
		</>
	);

	const RightSide = (): JSX.Element => {
		return (
			<Box
				component={'img'}
				height={1}
				width={1}
				borderRadius={2}
				src="/img/hydroponics.webp"
				srcSet="/img/hydroponics.webp 2x"
				alt="..."
				maxWidth={550}
			/>
		);
	};

	return (
		<Box
			sx={{
				width: 1,
				height: 1,
				overflow: 'hidden',
			}}
		>
			<Container paddingX={0} paddingY={0}>
				<Box
					display={'flex'}
					flexDirection={{ xs: 'column', md: 'row' }}
					position={'relative'}
					minHeight={{ md: 600 }}
				>
					<Box
						width={1}
						order={{ xs: 2, md: 1 }}
						display={'flex'}
						alignItems={'center'}
					>
						<Container>
							<LeftSide />
						</Container>
					</Box>
					<Box
						width={1}
						order={{ xs: 2, md: 1 }}
						display={'flex'}
						alignItems={'center'}
					>
						<Container>
							<RightSide />
						</Container>
					</Box>
				</Box>
			</Container>
		</Box>
	);
};

export default Hero;
