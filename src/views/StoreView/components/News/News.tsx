import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { alpha, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import fancyId from '@utils/fancyId';
import Link from 'next/link';
import Slider from 'react-slick';

interface Props {
	posts: any;
}

const LatestNews = ({ posts }: Props): JSX.Element => {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});

	const sliderOpts = {
		dots: !isMd,
		infinite: true,
		speed: 2000,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: isMd,
		autoplay: true,
		autoplaySpeed: 7000,
		pauseOnHover: true,
	};

	return (
		<Box
			sx={{
				position: 'relative',
				'&::after': {
					position: 'absolute',
					content: '""',
					width: '30%',
					zIndex: 1,
					top: 0,
					right: 0,
					height: '100%',
					backgroundSize: '18px 18px',
					backgroundImage: `radial-gradient(${alpha(
						theme.palette.primary.dark,
						0.4
					)} 20%, transparent 20%)`,
					opacity: 0.2,
				},
			}}
		>
			<Box position={'relative'} zIndex={2}>
				<Box marginBottom={4}>
					<Typography
						variant="h4"
						align={'center'}
						data-aos={'fade-up'}
						gutterBottom
						sx={{
							fontWeight: 600,
							marginTop: theme.spacing(1),
						}}
					>
						Our latest news
					</Typography>
					<Typography
						variant="h6"
						align={'center'}
						color={'text.secondary'}
						data-aos={'fade-up'}
						sx={{ fontWeight: 400 }}
					>
						Experience your music like never before. Buy music instruments &
						accessories online.
					</Typography>
					<Box display="flex" justifyContent={'center'} marginTop={2}>
						<Button variant="contained" color="primary" size="large">
							Browse the blog
						</Button>
					</Box>
				</Box>
				<Box
					sx={{
						height: { xs: 'auto', md: 1 },
						'& .slick-slide img': {
							objectFit: 'cover',
						},
						'& .slick-list, & .slick-slider, & .slick-track, & .slick-slide > div':
							{
								height: { xs: 'auto', md: 1 },
							},
						'& .slick-prev, & .slick-next': {
							zIndex: 2,
							bottom: 0,
							top: '100%',
							left: '100%',
							right: 0,
							transform: `translate(-100%, calc(-100% - ${theme.spacing(2)}))`,
							marginLeft: theme.spacing(-2),
							width: 32,
							height: 32,
							'&:before': {
								fontSize: 32,
								color: 'primary.main',
							},
						},
						'& .slick-prev': {
							marginLeft: theme.spacing(-7),
						},
					}}
				>
					<Slider {...sliderOpts}>
						{posts.map((post) => {
							const {
								frontMatter: {
									title,
									description,
									thumbnailUrl,
									date,
									tags,
									author,
								},
								slug,
							} = post;

							return (
								<Box key={fancyId()}>
									<Card
										sx={{
											display: 'flex',
											flexDirection: { xs: 'column', md: 'row' },
											boxShadow: 0,
											background: 'transparent',
										}}
									>
										<CardMedia
											image={thumbnailUrl}
											sx={{
												height: 300,
												width: '100%',
												maxWidth: 400,
												borderRadius: 4,
												margin: { xs: '0 auto', md: 'none' },
											}}
										/>
										<CardContent
											sx={{
												display: 'flex',
												alignItems: 'center',
												marginLeft: { sx: 0, md: 2 },
											}}
										>
											<Box>
												<Typography
													color="text.primary"
													variant={'h6'}
													sx={{
														textAlign: { xs: 'center', md: 'left' },
													}}
												>
													{title}
												</Typography>
												<Typography color="text.secondary">
													{description}
												</Typography>
												<Box
													marginTop={2}
													display={'flex'}
													justifyContent={{ xs: 'center', md: 'flex-start' }}
												>
													<Link href={`/blog/${slug}`}>
														<Button
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
															Read More
														</Button>
													</Link>
												</Box>
											</Box>
										</CardContent>
									</Card>
								</Box>
							);
						})}
					</Slider>
				</Box>
			</Box>
		</Box>
	);
};

export default LatestNews;
