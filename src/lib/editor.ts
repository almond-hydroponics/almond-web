import { uploadImage } from '@lib/cloudinary';
import { displaySnackMessage } from '@store/slices/snack';
import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';
import { AnyAction, Dispatch } from 'redux';
import { Cursor } from 'textarea-markdown-editor';

const markdownToHtml = (markdown: string) => {
	return DOMPurify.sanitize(marked.parse(markdown, { breaks: true }));
};

const replacePlaceholder = (
	cursor: Cursor,
	placeholder: string,
	replaceWith: string
) => {
	cursor.setText(cursor.getText().replace(placeholder, replaceWith));
};

const handleUploadImages = (
	textareaEl: HTMLTextAreaElement,
	files: File[],
	dispatch: Dispatch<AnyAction>
) => {
	const cursor = new Cursor(textareaEl);
	const currentLineNumber = cursor.getCurrentPosition().lineNumber;

	files.forEach(async (file, idx) => {
		const placeholder = `![Uploading ${file.name}...]()`;

		cursor.spliceContent(Cursor.raw`${placeholder}${Cursor.$}`, {
			startLineNumber: currentLineNumber + idx,
		});

		try {
			const uploadedImage = await uploadImage(file);

			replacePlaceholder(
				cursor,
				placeholder,
				`<img width='${
					uploadedImage.dpi >= 144
						? Math.round(uploadedImage.width / 2)
						: uploadedImage.width
				}' alt='${uploadedImage.originalFilename}' src='${uploadedImage.url}'>`
			);
		} catch (error: any) {
			replacePlaceholder(cursor, placeholder, '');
			dispatch(
				displaySnackMessage({
					message: `Error uploading image: ${error.message}`,
					severity: 'error',
				})
			);
		}
	});
};

const getSuggestionData = (
	textareaEl: HTMLTextAreaElement
): {
	keystrokeTriggered: boolean;
	triggerIdx: number;
	type: 'mention' | 'emoji';
	query: string;
} => {
	const positionIndex = textareaEl.selectionStart;
	const textBeforeCaret = textareaEl.value.slice(0, positionIndex);

	const tokens = textBeforeCaret.split(/\s/);
	const lastToken = tokens[tokens.length - 1];

	const triggerIdx = textBeforeCaret.endsWith(lastToken)
		? textBeforeCaret.length - lastToken.length
		: -1;

	const maybeTrigger = textBeforeCaret[triggerIdx];
	const mentionKeystrokeTriggered = maybeTrigger === '@';
	const emojiKeystrokeTriggered = maybeTrigger === ':';
	const keystrokeTriggered =
		mentionKeystrokeTriggered || emojiKeystrokeTriggered;
	const type = mentionKeystrokeTriggered ? 'mention' : 'emoji';

	const query = textBeforeCaret.slice(triggerIdx + 1);

	return {
		keystrokeTriggered,
		triggerIdx,
		type,
		query,
	};
};

export { markdownToHtml, handleUploadImages, getSuggestionData };
