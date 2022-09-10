import Container from '@components/Container';
import { PostForm } from '@components/molecules';
import { trpc } from '@lib/trpc';
import { Add, ArrowBackRounded } from '@mui/icons-material';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { displaySnackMessage } from '@store/slices/snack';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

const NewPostView = (): JSX.Element => {
	const router = useRouter();
	const theme = useTheme();
	const dispatch = useDispatch();
	const addPostMutation = trpc.useMutation('post.add', {
		onError: (error) => {
			dispatch(
				displaySnackMessage({
					message: `Something went wrong: ${error.message}`,
					severity: 'error',
				})
			);
		},
	});

	return (
		<>
			<Head>
				<title>New post - almond</title>
			</Head>

			<Container
				maxWidth={{ sm: 720, md: 960 }}
				paddingY={{ xs: 4, sm: 6, md: 2 }}
			>
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center"
					spacing={2}
				>
					<Box
						sx={{ display: 'flex' }}
						alignItems={'center'}
						onClick={router.back}
					>
						<IconButton
							style={{ marginRight: theme.spacing(1) }}
							color="primary"
						>
							<ArrowBackRounded className="learn-more-link__arrow" />
						</IconButton>
						<Typography
							variant="body2"
							color="primary"
							sx={{ cursor: 'pointer' }}
						>
							Back
						</Typography>
					</Box>
					<Button
						variant="outlined"
						startIcon={<Add />}
						sx={{ paddingY: 0.5 }}
					>
						Save
					</Button>
				</Stack>

				<Box
					marginTop={2}
					display={'flex'}
					justifyContent={'center'}
					alignItems={'center'}
					// width={1}
				>
					{/*<ReactEditorJS tools={EDITOR_JS_TOOLS} />*/}
					<PostForm
						isSubmitting={addPostMutation.isLoading}
						defaultValues={{
							title: '',
							content: '',
						}}
						backTo="/news"
						onSubmit={(values) => {
							addPostMutation.mutate(
								{ title: values.title, content: values.content },
								{
									onSuccess: (data) => router.push(`/news/${data.id}`),
								}
							);
						}}
					/>
				</Box>
			</Container>
		</>
	);
};

export default NewPostView;
