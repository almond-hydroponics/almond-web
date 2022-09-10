import { HtmlView } from '@components/atoms';
import { getQueryPaginationInput } from '@components/molecules/Pagination';
import { summarize } from '@lib/text';
import { InferQueryOutput, InferQueryPathAndInput, trpc } from '@lib/trpc';
import { BookmarkAddTwoTone, Delete, EditTwoTone } from '@mui/icons-material';
import {
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	ClickAwayListener,
	Grid,
	IconButton,
	Paper,
	Popper,
	PopperPlacementType,
	Stack,
	Tooltip,
	Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { animated, useSpring } from '@react-spring/web';
import { displaySnackMessage } from '@store/slices/snack';
import dayjsTime from '@utils/dayjsTime';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MouseEvent, ReactElement, forwardRef, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch } from 'react-redux';

const POSTS_PER_PAGE = 20;

interface Props {
	posts: InferQueryOutput<'news.feed'>['posts'];
}

interface FadeProps {
	children?: ReactElement;
	in?: boolean;
	onEnter?: () => void;
	onExited?: () => void;
}

const Fade = forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
	const { in: open, children, onEnter, onExited, ...other } = props;
	const style = useSpring({
		from: { opacity: 0 },
		to: { opacity: open ? 1 : 0 },
		onStart: () => {
			if (open && onEnter) {
				onEnter();
			}
		},
		onRest: () => {
			if (!open && onExited) {
				onExited();
			}
		},
	});

	return (
		<animated.div ref={ref} style={style} {...other}>
			{children}
		</animated.div>
	);
});

const MostViewedArticles = ({ posts }: Props): JSX.Element => {
	const { data: session } = useSession();
	const utils = trpc.useContext();
	const router = useRouter();
	const theme = useTheme();
	const dispatch = useDispatch();
	const [isConfirmDeleteDialogOpen, setIsConfirmDeleteDialogOpen] =
		useState<boolean>(false);
	const [placement, setPlacement] = useState<PopperPlacementType>();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const currentPageNumber = router.query.page ? Number(router.query.page) : 1;
	const feedQueryPathAndInput: InferQueryPathAndInput<'news.feed'> = [
		'news.feed',
		getQueryPaginationInput(POSTS_PER_PAGE, currentPageNumber),
	];

	const isUserAdmin = session?.user.role === 'ADMIN';

	const handleClick =
		(newPlacement: PopperPlacementType) =>
		(event: MouseEvent<HTMLButtonElement>) => {
			setAnchorEl(event.currentTarget);
			setIsConfirmDeleteDialogOpen(
				(prev) => placement !== newPlacement || !prev
			);
			setPlacement(newPlacement);
		};

	const handleClickAway = () => {
		setIsConfirmDeleteDialogOpen(false);
	};

	const deletePostMutation = trpc.useMutation('post.delete', {
		onSuccess: () => {
			return utils.invalidateQueries(feedQueryPathAndInput);
		},
		onError: (error) => {
			dispatch(
				displaySnackMessage({
					message: `Something went wrong: ${error.message}`,
					severity: 'error',
				})
			);
		},
	});

	const handleDeletePost = (event) => {
		const { id } = event.target;
		deletePostMutation.mutate(id, {
			onSuccess: () => {
				dispatch(
					displaySnackMessage({
						message: 'Post deleted successfully.',
					})
				);
			},
		});
	};

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
				{posts.map((post) => {
					const { id, title, contentHtml, thumbnailUrl, createdAt, author } =
						post;
					const tag = 'Blah';

					const summary = summarize(contentHtml);

					return (
						<Grid item xs={12} key={id} id={id}>
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
											<Box>
												<Tooltip title="Bookmark" placement="top">
													<IconButton aria-label="bookmark" color="primary">
														<BookmarkAddTwoTone />
													</IconButton>
												</Tooltip>

												{!!session && isUserAdmin ? (
													<Tooltip title="Edit" placement="top">
														<IconButton aria-label="edit" color="secondary">
															<EditTwoTone />
														</IconButton>
													</Tooltip>
												) : null}

												{!!session && isUserAdmin ? (
													<ClickAwayListener
														mouseEvent="onMouseDown"
														touchEvent="onTouchStart"
														onClickAway={handleClickAway}
													>
														<IconButton
															onClick={handleClick('right')}
															aria-label="delete"
															color="error"
															aria-controls={
																isConfirmDeleteDialogOpen
																	? 'delete-menu'
																	: undefined
															}
															aria-haspopup="true"
															aria-expanded={
																isConfirmDeleteDialogOpen ? 'true' : undefined
															}
														>
															<Tooltip title="Remove" placement="top">
																<Delete />
															</Tooltip>
															<Popper
																open={isConfirmDeleteDialogOpen}
																anchorEl={anchorEl}
																placement={placement}
																transition
															>
																{({ TransitionProps }) => (
																	<Fade {...TransitionProps}>
																		<Paper variant="outlined">
																			<Button
																				id={id}
																				color="error"
																				onClick={handleDeletePost}
																			>
																				Delete
																			</Button>
																			<Button>Cancel</Button>
																		</Paper>
																	</Fade>
																)}
															</Popper>
														</IconButton>
													</ClickAwayListener>
												) : null}
											</Box>
										</Stack>
									</Box>
									<HtmlView html={summary} />
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
