import { HtmlView } from '@components/atoms';
import { InferQueryOutput } from '@lib/trpc';
import {
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	Grid,
	Stack,
	Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import dayjsTime from '@utils/dayjsTime';
import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface Props {
	posts: InferQueryOutput<'news.feed'>['posts'];
}

const MostViewedArticles = ({ posts }: Props): JSX.Element => {
	const theme = useTheme();

	return (
		<Box>
			<Box
				display={'flex'}
				justifyContent={'space-between'}
				alignItems={{ xs: 'flex-start', sm: 'center' }}
				flexDirection={{ xs: 'column', sm: 'row' }}
				marginBottom={4}
			/>
			<Grid container spacing={4}>
				{posts.map((post, i) => {
					const { id, title, contentHtml, thumbnailUrl, createdAt, author } =
						post;
					const tag = 'Blah';

					return (
						<Grid item xs={12} key={i}>
							<Box
								component={Card}
								width={1}
								height={1}
								borderRadius={0}
								boxShadow={0}
								display={'flex'}
								flexDirection={{ xs: 'column', md: 'row' }}
								sx={{ backgroundImage: 'none', bgcolor: 'transparent' }}
							>
								<Link href={`/news/${id}`}>
									<Box
										sx={{
											width: { xs: 1, md: '30%' },
											'& .lazy-load-image-loaded': {
												height: 1,
												display: 'flex !important',
											},
										}}
									>
										{/*<Box*/}
										{/*	component={'img'}*/}
										{/*	src={thumbnailUrl}*/}
										{/*	srcSet={`${thumbnailUrl} 2x`}*/}
										{/*	alt="..."*/}
										{/*	height={1}*/}
										{/*	width={1}*/}
										{/*	sx={{*/}
										{/*		borderRadius: 2,*/}
										{/*		objectFit: 'cover',*/}
										{/*		maxHeight: 200,*/}
										{/*		cursor: 'pointer',*/}
										{/*		filter:*/}
										{/*			theme.palette.mode === 'dark'*/}
										{/*				? 'brightness(0.7)'*/}
										{/*				: 'none',*/}
										{/*	}}*/}
										{/*/>*/}
										<Box
											component={LazyLoadImage}
											height={1}
											width={1}
											src={thumbnailUrl as string}
											alt="..."
											effect="blur"
											sx={{
												borderRadius: 2,
												objectFit: 'cover',
												maxHeight: 200,
												cursor: 'pointer',
												filter:
													theme.palette.mode === 'dark'
														? 'brightness(0.7)'
														: 'none',
											}}
										/>
									</Box>
								</Link>
								<CardContent
									sx={{
										width: { xs: 1, md: '70%' },
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'center',
										padding: { xs: 0, md: 1 },
									}}
								>
									<Link href={`/news/${id}`}>
										<Typography
											fontWeight={500}
											marginTop={{ xs: 1, md: 0 }}
											sx={{ cursor: 'pointer' }}
										>
											{title}
										</Typography>
									</Link>
									<Box marginY={1}>
										<Stack
											direction="row"
											justifyContent="space-between"
											alignItems="center"
											spacing={2}
										>
											<div>
												<Typography
													variant={'caption'}
													color={'text.secondary'}
													// component={'i'}
												>
													{author?.name} - {dayjsTime(createdAt).fromNow()}
												</Typography>
												<Chip
													component={'a'}
													href={''}
													label={tag}
													clickable
													sx={{ margin: 0.5, fontSize: 12 }}
													size={'small'}
												/>
											</div>
											{/*<BookmarkAddOutlined sx={{ cursor: 'pointer' }} />*/}
										</Stack>
									</Box>
									<HtmlView html={contentHtml} />
									<Link href={`/news/${id}`}>
										<Box
											marginTop={2}
											display={'flex'}
											justifyContent={'flex-end'}
										>
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
										</Box>
									</Link>
								</CardContent>
							</Box>
						</Grid>
					);
				})}
			</Grid>
		</Box>
	);
};

export default MostViewedArticles;
