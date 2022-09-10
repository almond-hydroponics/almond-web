import { Link, MarkdownIcon } from '@components/atoms';
import { MarkdownEditor } from '@components/molecules';
import { useLeaveConfirm } from '@lib/form';
import { Box, Button, Stack, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

type FormData = {
	title: string;
	content: string;
};

type PostFormProps = {
	defaultValues?: FormData;
	isSubmitting?: boolean;
	backTo: string;
	onSubmit: SubmitHandler<FormData>;
};

const PostForm = ({
	defaultValues,
	isSubmitting,
	backTo,
	onSubmit,
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
				<TextField
					{...register('title', { required: true })}
					label="Title"
					autoFocus
					required
					size="medium"
					fullWidth
				/>

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
								width: '100%',
								border: `1px solid ${theme.palette.divider}`,
								borderRadius: '8px',
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
				>
					<Box>
						<Button
							type="submit"
							// isLoading={isSubmitting}
							// loadingChildren={`${defaultValues ? 'Saving' : 'Publishing'}`}
						>
							{defaultValues?.title ? 'Save' : 'Publish'}
						</Button>
						<Button component={Link} href={backTo} variant="text">
							Cancel
						</Button>
					</Box>
					{!isSubmitting && (
						<Button
							component={Link}
							startIcon={<MarkdownIcon />}
							href="https://docs.github.com/en/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax"
							target="_blank"
							rel="noreferrer"
						>
							Markdown supported
						</Button>
					)}
				</Stack>
			</form>
		</Box>
	);
};

export default PostForm;
