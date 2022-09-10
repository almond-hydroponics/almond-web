import Container from '@components/Container';
import { PostForm } from '@components/molecules';
import { browserEnv } from '@env/browser';
import { uploadImage } from '@lib/cloudinary';
import { trpc } from '@lib/trpc';
import { ArrowBackRounded } from '@mui/icons-material';
import { IconButton, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { displaySnackMessage } from '@store/slices/snack';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const NewPostView = (): JSX.Element => {
	const router = useRouter();
	const theme = useTheme();
	const dispatch = useDispatch();

	const [uploadedThumbnailImage, setUploadedThumbnailImage] = useState('');
	const [thumbnailImageName, setThumbnailImageName] =
		useState('Select thumbnail');

	const handleUploadThumbnail = async (event) => {
		if (browserEnv.NEXT_PUBLIC_ENABLE_IMAGE_UPLOAD) {
			const files = event.target.files;

			if (files && files.length > 0) {
				const file = files[0];
				if (file.size > 5242880) {
					dispatch(
						displaySnackMessage({
							message: 'Thumbnail image is bigger than 5MB',
							severity: 'error',
						})
					);
					return;
				}

				const imageFiles: any[] = Array.from(files).filter((file: any) =>
					/image/i.test(file.type)
				);

				if (imageFiles.length === 0) {
					return;
				}

				try {
					const uploadedImage = await uploadImage(imageFiles[0]);
					setUploadedThumbnailImage(uploadedImage.url);
					setThumbnailImageName(uploadedImage.originalFilename);
					dispatch(
						displaySnackMessage({
							message: 'Thumbnail uploaded successfully.',
						})
					);
				} catch (error: any) {
					dispatch(
						displaySnackMessage({
							message: `Error uploading image: ${error.message}`,
							severity: 'error',
						})
					);
				}
			}
		}
	};

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
							thumbnailUrl: '',
						}}
						backTo="/news"
						onSubmit={(values) => {
							addPostMutation.mutate(
								{
									title: values.title,
									content: values.content,
									thumbnailUrl: uploadedThumbnailImage,
								},
								{
									onSuccess: (data) => router.push(`/news/${data.id}`),
								}
							);
						}}
						handleUploadThumbnail={handleUploadThumbnail}
						thumbnailImageName={thumbnailImageName}
					/>
				</Box>
			</Container>
		</>
	);
};

export default NewPostView;
