import { Box, ButtonBase, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { AnalyticsCardProps } from './interfaces';

const AnalyticsCard = ({
	icon,
	mainInfo,
	subInfo,
	colorClass,
	onClick,
}: AnalyticsCardProps): JSX.Element => {
	const theme = useTheme();
	const classes = {
		root: {
			flexGrow: 1,
		},
		details: {
			display: 'flex',
			flexDirection: 'row',
		},
		content: {
			flex: '1 0 auto',
			flexDirection: 'row',
			width: '100%',
		},
		title: {
			fontWeight: 500,
		},
		cardPaper: {
			borderRadius: 12,
		},
		image: {
			width: 128,
			height: 128,
		},
		mainCard: {
			cursor: 'pointer',
			borderRadius: 2,
			height: 'fit-content',
			border: `1px solid ${theme.palette.divider}`,
			marginBottom: 1,
			[theme.breakpoints.up('sm')]: {
				marginRight: 1,
			},
			// [theme.breakpoints.down('sm')]: {
			// 	paddingTop: '0 !important',
			// 	marginBottom: 1,
			// },
		},
		mainInfo: {
			[theme.breakpoints.down('sm')]: {
				display: 'none',
			},
		},
		yellowCard: {
			color: '#271900',
			backgroundColor: '#ffdea6',
			borderColor: '#71340F',
		},

		blueCard: {
			color: '#282B2D',
			backgroundColor: '#B9E3FD',
			borderColor: '#282B2D',
		},

		purpleCard: {
			color: '#332D41',
			backgroundColor: '#EADDFF',
			borderColor: '#332D41',
		},

		brownCard: {
			color: '#3e2723',
			backgroundColor: '#efebe9',
			borderColor: '#3e2723',
		},

		tealCard: {
			color: '#34383B',
			backgroundColor: '#D5E4EB',
			borderColor: '#BFD7DF',
		},

		greenCard: {
			color: '#3E4E56',
			backgroundColor: '#D9E9BA',
			borderColor: '#3E4E56',
		},
	};

	return (
		<Grid item lg={4} md={6} xs={6}>
			<Box
				sx={{ ...classes[colorClass!], ...classes.mainCard }}
				onClick={onClick}
				data-testid="analytics-card"
			>
				<Box marginLeft={2} marginTop={1} display={{ sm: 'none' }}>
					<Typography
						classes={classes.mainInfo}
						// fontWeight={500}
						// fontSize={{ xs: 14, sm: 16 }}
						sx={{ ...classes[colorClass!] }}
						variant="body2"
						data-testid="main-info"
					>
						{mainInfo}
					</Typography>
				</Box>
				<Box
					// classes={classes.content}
					padding={2}
					display={'flex'}
					alignItems={'center'}
				>
					<Box marginRight={2}>
						<ButtonBase>{icon}</ButtonBase>
					</Box>
					<Box
						display={'flex'}
						flexDirection={{ xs: 'column', sm: 'row' }}
						flex={'1 1 100%'}
						justifyContent={{ sm: 'space-between' }}
						alignItems={{ sm: 'center' }}
					>
						<Typography
							fontWeight={500}
							// fontSize={{ xs: 14, sm: 16 }}
							sx={{ ...classes[colorClass!], ...classes.mainInfo }}
							variant="body1"
							data-testid="main-info"
						>
							{mainInfo}
						</Typography>
						<Typography
							variant="h4"
							fontWeight={600}
							sx={{ ...classes[colorClass!] }}
							data-testid="sub-info"
						>
							{subInfo}
						</Typography>
					</Box>
				</Box>
			</Box>
		</Grid>
	);
};

export default AnalyticsCard;
