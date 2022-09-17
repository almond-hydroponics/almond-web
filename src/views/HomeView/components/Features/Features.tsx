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
	TimelineSeparator,
} from '@mui/lab';
import { Button, Card } from '@mui/material';
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

const features = [
	{
		color: 'greenCard',
		title: 'Blah',
		subtitle: 'Choose thousands of Web design online course blah blah.',
		icon: (
			<svg
				height={24}
				width={24}
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
				/>
			</svg>
		),
	},
	{
		color: 'blueCard',
		title: 'Blah',
		subtitle: 'Choose thousands of photography online course.',
		icon: (
			<svg
				height={24}
				width={24}
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
				/>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
				/>
			</svg>
		),
	},
	{
		color: 'redCard',
		title: 'Blah',
		subtitle: 'Choose thousands of Video creating online course.',
		icon: (
			<svg
				height={24}
				width={24}
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
				/>
			</svg>
		),
	},
	{
		color: 'brownCard',
		title: 'Blah',
		subtitle: 'Choose thousands of Graphic design online course.',
		icon: (
			<svg
				height={24}
				width={24}
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
				/>
			</svg>
		),
	},
];

const colorClasses = {
	yellowCard: {
		color: '#71340F',
		backgroundColor: '#FEF2E8',
		borderColor: '#71340F',
	},

	blueCard: {
		color: '#1967d2',
		backgroundColor: '#e8f0fe',
		borderColor: '#1967d2',
	},

	purpleCard: {
		color: '#501174',
		backgroundColor: '#F4EEF8',
		borderColor: '#501174',
	},

	brownCard: {
		color: '#3e2723',
		backgroundColor: '#efebe9',
		borderColor: '#3e2723',
	},

	redCard: {
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

const Features = (): JSX.Element => {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	const { ref, inView, entry } = useInView({
		/* Optional options */
		threshold: 0,
	});

	const LeftSide = () => (
		<Grid container spacing={isMd ? 4 : 2}>
			{features.map((item, index) => (
				<Grid
					item
					xs={12}
					sm={6}
					key={index}
					data-aos="fade-up"
					data-aos-delay={index * 100}
					data-aos-offset={100}
					data-aos-duration={600}
				>
					<Box
						display={'block'}
						width={1}
						sx={{
							transform: index % 2 === 1 ? { md: 'translateY(50px)' } : 'none',
						}}
					>
						<Box
							component={Card}
							padding={isMd ? 4 : 2}
							width={1}
							variant="outlined"
							sx={{
								...colorClasses[item.color],
								border: `1px solid ${theme.palette.divider}`,
							}}
						>
							<Box display={'flex'} flexDirection={'column'}>
								<Typography
									variant={'h6'}
									gutterBottom
									sx={{ fontWeight: 600 }}
								>
									{item.title}
								</Typography>
								<Typography color="text.secondary">{item.subtitle}</Typography>
								<Box sx={{ flexGrow: 1 }} />
								<Box
									marginTop={0}
									display={'flex'}
									justifyContent={'flex-end'}
								>
									<Button
										sx={{ color: 'text.primary' }}
										endIcon={
											<Box
												component={'svg'}
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												width={24}
												height={24}
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M17 8l4 4m0 0l-4 4m4-4H3"
												/>
											</Box>
										}
									>
										Learn more
									</Button>
								</Box>
							</Box>
						</Box>
					</Box>
				</Grid>
			))}
		</Grid>
	);

	return (
		<Box ref={ref}>
			<Grid container spacing={4} direction={isMd ? 'row' : 'column-reverse'}>
				<Grid item xs={12} md={6} data-aos={isMd ? 'fade-right' : 'fade-up'}>
					<Box marginBottom={4}>
						<Typography sx={{ fontWeight: 600 }} variant={'h5'} gutterBottom>
							Try one of our produce.
						</Typography>
						<Typography color={'text.secondary'} sx={{ fontWeight: 400 }}>
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
							{/*<TimelineOppositeContent*/}
							{/*	sx={{ m: 'auto 0' }}*/}
							{/*	align="right"*/}
							{/*	variant="body2"*/}
							{/*	color="text.secondary"*/}
							{/*>*/}
							{/*	Prepare*/}
							{/*</TimelineOppositeContent>*/}
							<TimelineSeparator>
								{/*<TimelineConnector />*/}
								<TimelineDot>
									<CalendarToday />
								</TimelineDot>
								<TimelineConnector />
							</TimelineSeparator>
							<TimelineContent sx={{ py: '16px', px: 2 }}>
								<Typography variant="body1" component="span" color="primary">
									Start
								</Typography>
								<Typography variant="body2">Select your produce</Typography>
							</TimelineContent>
						</TimelineItem>

						<TimelineItem>
							{/*<TimelineOppositeContent*/}
							{/*	sx={{ m: 'auto 0' }}*/}
							{/*	variant="body2"*/}
							{/*	color="text.secondary"*/}
							{/*>*/}
							{/*	Day 1*/}
							{/*</TimelineOppositeContent>*/}
							<TimelineSeparator>
								<TimelineConnector />
								<TimelineDot color="primary">
									<Dry />
								</TimelineDot>
								<TimelineConnector />
							</TimelineSeparator>
							<TimelineContent sx={{ py: '16px', px: 2 }}>
								<Typography variant="body1" component="span" color="primary">
									Plant
								</Typography>
								<Typography variant="body2">
									Add your seeds to the pod
								</Typography>
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
							<TimelineContent sx={{ py: '16px', px: 2 }}>
								<Typography variant="body1" component="span" color="primary">
									Care
								</Typography>
								<Typography variant="body2">
									Add nutrients every few weeks
								</Typography>
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
							<TimelineContent sx={{ py: '16px', px: 2 }}>
								<Typography variant="body1" component="span" color="primary">
									Reap
								</Typography>
								<Typography variant="body2">
									Harvest only what you need
								</Typography>
							</TimelineContent>
						</TimelineItem>

						<TimelineItem>
							<TimelineSeparator>
								<TimelineConnector />
								<TimelineDot color="primary" variant="outlined">
									<Fastfood />
								</TimelineDot>
								{/*<TimelineConnector />*/}
							</TimelineSeparator>
							<TimelineContent sx={{ py: '16px', px: 2 }}>
								<Typography variant="body1" component="span" color="primary">
									Feast
								</Typography>
								<Typography variant="body2">Yummy! Eat and enjoy</Typography>
							</TimelineContent>
						</TimelineItem>
					</Timeline>
					{/*<LeftSide />*/}
				</Grid>
			</Grid>
		</Box>
	);
};

export default Features;
