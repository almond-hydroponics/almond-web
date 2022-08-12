import {
	ApiRounded,
	CalendarToday,
	Dry,
	EmojiNature,
	Fastfood,
} from '@mui/icons-material';
import {
	Timeline,
	TimelineConnector,
	TimelineContent,
	TimelineDot,
	TimelineItem,
	TimelineOppositeContent,
	TimelineSeparator,
} from '@mui/lab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import fancyId from '@utils/fancyId';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
// import VisibilitySensor from 'react-visibility-sensor';

const mock = [
	{
		title: 300,
		subtitle:
			'deliveries of our locally produced vermijuice with all nutrients.',
		suffix: '+',
	},
	{
		title: 21,
		subtitle: 'farms across all regions in Kenya and growing fast with us.',
		suffix: '+',
	},
	{
		title: 99,
		subtitle: 'of our customers rated 5-star our new way of growing.',
		suffix: '%',
	},
];

const Features = (): JSX.Element => {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	const { ref, inView, entry } = useInView({
		/* Optional options */
		threshold: 0,
	});

	return (
		<Box ref={ref}>
			<Grid container spacing={4} direction={isMd ? 'row' : 'column-reverse'}>
				<Grid item xs={12} md={6} data-aos={isMd ? 'fade-right' : 'fade-up'}>
					<Box marginBottom={4}>
						<Typography sx={{ fontWeight: 600 }} variant={'h5'} gutterBottom>
							Try one of our produce.
						</Typography>
						<Typography
							variant={'h6'}
							component={'p'}
							color={'text.secondary'}
							sx={{ fontWeight: 400 }}
						>
							With our hydroponics home farm, we grow sweet strawberries,
							perfect for eating anytime.
						</Typography>
					</Box>
					<Grid container spacing={2}>
						{mock.map((item) => (
							<Grid key={fancyId()} item xs={12} md={4}>
								<Typography
									fontWeight={500}
									variant="h4"
									color={'primary'}
									gutterBottom
								>
									<CountUp
										redraw={false}
										end={inView ? +item.title : 0}
										start={0}
										suffix={item.suffix}
									/>
								</Typography>
								<Typography
									color="text.secondary"
									component="p"
									variant="body1"
								>
									{item.subtitle}
								</Typography>
							</Grid>
						))}
					</Grid>
				</Grid>
				<Grid
					item
					container
					justifyContent="center"
					alignItems="center"
					xs={12}
					md={6}
					data-aos={'zoom-in'}
					sx={{
						display: 'flex',
					}}
				>
					<Timeline position="alternate">
						<TimelineItem>
							<TimelineOppositeContent
								sx={{ m: 'auto 0' }}
								align="right"
								variant="body2"
								color="text.secondary"
							>
								Prepare
							</TimelineOppositeContent>
							<TimelineSeparator>
								<TimelineConnector />
								<TimelineDot>
									<CalendarToday />
								</TimelineDot>
								<TimelineConnector />
							</TimelineSeparator>
							<TimelineContent sx={{ py: '12px', px: 2 }}>
								<Typography variant="h6" component="span" color="primary">
									Start
								</Typography>
								<Typography>Select your produce</Typography>
							</TimelineContent>
						</TimelineItem>
						<TimelineItem>
							<TimelineOppositeContent
								sx={{ m: 'auto 0' }}
								variant="body2"
								color="text.secondary"
							>
								Day 1
							</TimelineOppositeContent>
							<TimelineSeparator>
								<TimelineConnector />
								<TimelineDot color="primary">
									<Dry />
								</TimelineDot>
								<TimelineConnector />
							</TimelineSeparator>
							<TimelineContent sx={{ py: '12px', px: 2 }}>
								<Typography variant="h6" component="span" color="primary">
									Plant
								</Typography>
								<Typography>Add your seeds to the pod</Typography>
							</TimelineContent>
						</TimelineItem>
						<TimelineItem>
							<TimelineSeparator>
								<TimelineConnector />
								<TimelineDot color="primary" variant="outlined">
									<EmojiNature />
								</TimelineDot>
								<TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
							</TimelineSeparator>
							<TimelineContent sx={{ py: '12px', px: 2 }}>
								<Typography variant="h6" component="span" color="primary">
									Care
								</Typography>
								<Typography>Add nutrients every few weeks</Typography>
							</TimelineContent>
						</TimelineItem>
						<TimelineItem>
							<TimelineSeparator>
								<TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
								<TimelineDot color="secondary">
									<ApiRounded />
								</TimelineDot>
								<TimelineConnector />
							</TimelineSeparator>
							<TimelineContent sx={{ py: '12px', px: 2 }}>
								<Typography variant="h6" component="span" color="primary">
									Reap
								</Typography>
								<Typography>Harvest only what you need</Typography>
							</TimelineContent>
						</TimelineItem>
						<TimelineItem>
							<TimelineSeparator>
								<TimelineConnector />
								<TimelineDot color="primary" variant="outlined">
									<Fastfood />
								</TimelineDot>
								<TimelineConnector />
							</TimelineSeparator>
							<TimelineContent sx={{ py: '12px', px: 2 }}>
								<Typography variant="h6" component="span" color="primary">
									Feast
								</Typography>
								<Typography>Yummy! Eat and enjoy</Typography>
							</TimelineContent>
						</TimelineItem>
					</Timeline>
					{/*<Box component={Card} boxShadow={4} height={1} width={1}>*/}
					{/*	<Box*/}
					{/*		component={CardMedia}*/}
					{/*		height={1}*/}
					{/*		width={1}*/}
					{/*		minHeight={300}*/}
					{/*		image="https://storage.googleapis.com/static.almondhydroponics.com/static/images/hydroponic-strawberries.jpg"*/}
					{/*	/>*/}
					{/*</Box>*/}
				</Grid>
			</Grid>
		</Box>
	);
};

export default Features;
