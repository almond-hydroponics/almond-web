import { Link, MarkdownIcon } from '@components/atoms';
import { MarkdownEditor } from '@components/molecules';
import { useLeaveConfirm } from '@lib/form';
import { PhotoOutlined } from '@mui/icons-material';
import {
	Box,
	Button,
	Grid,
	Skeleton,
	Stack,
	TextField,
	Typography,
	styled,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

type FormData = {
	title: string;
	content: string;
	thumbnailUrl: string;
};

type PostFormProps = {
	defaultValues?: FormData;
	isSubmitting?: boolean;
	backTo: string;
	onSubmit: SubmitHandler<FormData>;
	handleUploadThumbnail: (e?) => void;
	thumbnailImageName: string;
	uploadingImage: boolean;
};

const Input = styled('input')({
	display: 'none',
});

const PostForm = ({
	defaultValues,
	isSubmitting,
	backTo,
	onSubmit,
	handleUploadThumbnail,
	thumbnailImageName,
	uploadingImage,
}: PostFormProps) => {
	const theme = useTheme();
	const { control, register, formState, getValues, reset, handleSubmit } =
		useForm<FormData>({
			defaultValues,
		});

	useLeaveConfirm({ formState });

	const { isSubmitSuccessful } = formState;

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset(getValues());
		}
	}, [isSubmitSuccessful, reset, getValues]);

	return (
		<Box width={1}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid
					container
					direction="row"
					justifyContent="space-between"
					alignItems="center"
					spacing={2}
				>
					<Grid item xs={9}>
						<TextField
							{...register('title', { required: true })}
							label="Title"
							autoFocus
							multiline
							required
							size="small"
							fullWidth
						/>
					</Grid>
					<Grid item xs={3}>
						<Button
							component="label"
							variant="outlined"
							fullWidth
							startIcon={<PhotoOutlined />}
						>
							{uploadingImage ? <Skeleton width={124} /> : thumbnailImageName}
							<Input
								name="thumbnailUrl"
								id="upload-thumbnail"
								hidden
								accept=".jpg, .jpeg, .png, .gif"
								type="file"
								onChange={handleUploadThumbnail}
							/>
						</Button>
					</Grid>
				</Grid>

				<Controller
					name="content"
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<MarkdownEditor
							value={field.value}
							onChange={field.onChange}
							onTriggerSubmit={handleSubmit(onSubmit)}
							required
							style={{
								marginTop: '8px',
								maxWidth: '100%',
								minWidth: '100%',
								borderColor: theme.palette.divider,
								borderRadius: '5px',
								padding: '12px',
								fontFamily: 'CircularStd,Helvetica,Arial,sans-serif',
								color: theme.palette.text.secondary,
								fontSize: '16px',
							}}
						/>
					)}
				/>

				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center"
					spacing={2}
					border={`1px solid ${theme.palette.divider}`}
					borderRadius={'5px'}
					paddingY={1}
					marginBottom={2}
				>
					<Typography paddingLeft={2} variant="body2" color="text.secondary">
						Attach files by dragging & dropping, selecting or pasting them.
					</Typography>
					{!isSubmitting && (
						<Button
							component={Link}
							startIcon={<MarkdownIcon />}
							href="https://docs.github.com/en/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax"
							target="_blank"
							rel="noreferrer"
						/>
					)}
				</Stack>
				<Stack
					direction="row"
					justifyContent="flex-end"
					alignItems="flex-end"
					spacing={2}
				>
					<Button component={Link} variant="outlined" href={backTo}>
						Cancel
					</Button>
					<Button
						variant="contained"
						type="submit"
						// isLoading={isSubmitting}
						// loadingChildren={`${defaultValues ? 'Saving' : 'Publishing'}`}
					>
						{defaultValues?.title ? 'Save' : 'Publish'}
					</Button>
				</Stack>
			</form>
		</Box>
	);
};

export default PostForm;
