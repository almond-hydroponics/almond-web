import { HtmlView } from '@components/atoms';
import { browserEnv } from '@env/browser';
import {
	getSuggestionData,
	handleUploadImages,
	markdownToHtml,
} from '@lib/editor';
import { trpc } from '@lib/trpc';
import { FormatBold, FormatItalic, Link, List } from '@mui/icons-material';
import { Box, Button, ButtonGroup, Stack, Tab, Tabs } from '@mui/material';
import { matchSorter } from 'match-sorter';
import {
	ReactNode,
	SyntheticEvent,
	useEffect,
	useReducer,
	useRef,
	useState,
} from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import TextareaAutosize, {
	TextareaAutosizeProps,
} from 'react-textarea-autosize';
import getCaretCoordinates from 'textarea-caret';
import TextareaMarkdown, {
	TextareaMarkdownRef,
} from 'textarea-markdown-editor';
import { ItemOptions, useItemList } from 'use-item-list';

interface TabPanelProps {
	children?: ReactNode;
	index: number;
	value: number;
}

type MarkdownEditorProps = {
	value: string;
	onChange: (value: string) => void;
	onTriggerSubmit?: () => void;
} & Omit<
	TextareaAutosizeProps,
	'value' | 'onChange' | 'onKeyDown' | 'onInput' | 'onPaste' | 'onDrop'
>;

type SuggestionResult = {
	label: string;
	value: string;
};

type SuggestionPosition = {
	top: number;
	left: number;
};

type SuggestionType = 'mention' | 'emoji';

type SuggestionState = {
	isOpen: boolean;
	type: SuggestionType | null;
	position: SuggestionPosition | null;
	triggerIdx: number | null;
	query: string;
};

type SuggestionActionType =
	| {
			type: 'open';
			payload: {
				type: SuggestionType;
				position: SuggestionPosition;
				triggerIdx: number;
				query: string;
			};
	  }
	| { type: 'close' }
	| { type: 'updateQuery'; payload: string };

const suggestionReducer = (
	state: SuggestionState,
	action: SuggestionActionType
) => {
	switch (action.type) {
		case 'open':
			return {
				isOpen: true,
				type: action.payload.type,
				position: action.payload.position,
				triggerIdx: action.payload.triggerIdx,
				query: action.payload.query,
			};
		case 'close':
			return {
				isOpen: false,
				type: null,
				position: null,
				triggerIdx: null,
				query: '',
			};
		case 'updateQuery':
			return { ...state, query: action.payload };
		default:
			throw new Error();
	}
};

const TOOLBAR_ITEMS = [
	{
		commandTrigger: 'bold',
		icon: <FormatBold style={{ width: '16px', height: '16px' }} />,
		name: 'Bold',
	},
	{
		commandTrigger: 'italic',
		icon: <FormatItalic style={{ width: '16px', height: '16px' }} />,
		name: 'Italic',
	},
	{
		commandTrigger: 'unordered-list',
		icon: <List style={{ width: '16px', height: '16px' }} />,
		name: 'Unordered List',
	},
	{
		commandTrigger: 'link',
		icon: <Link style={{ width: '16px', height: '16px' }} />,
		name: 'Link',
	},
];

const MarkdownPreview = ({ markdown }: { markdown: string }) => {
	return (
		<Box
			sx={{
				borderColor: 'divider',
				marginTop: 1,
				marginBottom: '4px',
				width: 1,
				minHeight: '326px',
				border: (theme) => `1px solid ${theme.palette.divider}`,
				borderRadius: '8px',
				padding: '12px',
				fontFamily: 'CircularStd,Helvetica,Arial,sans-serif',
				color: (theme) => theme.palette.text.secondary,
				fontSize: '16px',
			}}
		>
			{markdown ? (
				<HtmlView html={markdownToHtml(markdown)} />
			) : (
				<p>Nothing to preview</p>
			)}
		</Box>
	);
};

const TabPanel = (props: TabPanelProps) => {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`markdown-tabpanel-${index}`}
			aria-labelledby={`markdown-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 0 }}>{children}</Box>}
		</div>
	);
};

const a11yProps = (index: number) => {
	return {
		id: `markdown-tab-${index}`,
		'aria-controls': `markdown-tabpanel-${index}`,
	};
};

const MarkdownEditor = ({
	value,
	minRows = 15,
	onChange,
	onTriggerSubmit,
	...rest
}: MarkdownEditorProps) => {
	const [tabValue, setTabValue] = useState<number>(0);
	const textareaMarkdownRef = useRef<TextareaMarkdownRef>(null);
	const [showPreview, setShowPreview] = useState(false);
	const [suggestionState, suggestionDispatch] = useReducer(suggestionReducer, {
		isOpen: false,
		type: null,
		position: null,
		triggerIdx: null,
		query: '',
	});
	const dispatch = useDispatch();

	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setTabValue(newValue);
		setShowPreview((prevState) => !prevState);
	};

	const closeSuggestion = () => {
		suggestionDispatch({ type: 'close' });
	};

	return (
		<Box sx={{ width: '100%' }}>
			{/*<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>*/}
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				spacing={2}
				paddingY={0}
			>
				<Tabs
					value={tabValue}
					onChange={handleChange}
					aria-label="markdown tabs"
				>
					<Tab label="Write" {...a11yProps(0)} />
					<Tab label="Preview" {...a11yProps(1)} />
				</Tabs>
				<ButtonGroup
					variant="outlined"
					size="small"
					aria-label="outlined button group"
				>
					{TOOLBAR_ITEMS.map((toolbarItem) => (
						<Button
							key={toolbarItem.commandTrigger}
							type="button"
							onClick={() => {
								textareaMarkdownRef.current?.trigger(
									toolbarItem.commandTrigger
								);
							}}
							disabled={showPreview}
							title={toolbarItem.name}
						>
							{toolbarItem.icon}
						</Button>
					))}
				</ButtonGroup>
			</Stack>
			<TabPanel value={tabValue} index={0}>
				<>
					<TextareaMarkdown.Wrapper
						ref={textareaMarkdownRef}
						commands={[
							{
								name: 'indent',
								enable: false,
							},
						]}
					>
						<TextareaAutosize
							{...rest}
							value={value}
							onChange={(event) => {
								onChange(event.target.value);

								const { keystrokeTriggered, triggerIdx, type, query } =
									getSuggestionData(event.currentTarget);

								if (!keystrokeTriggered) {
									if (suggestionState.isOpen) {
										closeSuggestion();
									}
									return;
								}

								if (suggestionState.isOpen) {
									suggestionDispatch({
										type: 'updateQuery',
										payload: query,
									});
								} else {
									const coords = getCaretCoordinates(
										event.currentTarget,
										triggerIdx + 1
									);
									suggestionDispatch({
										type: 'open',
										payload: {
											type,
											position: {
												top: coords.top + coords.height,
												left: coords.left,
											},
											triggerIdx,
											query,
										},
									});
								}
							}}
							onKeyDown={(event) => {
								const { code, metaKey } = event;
								if (code === 'Enter' && metaKey) {
									onTriggerSubmit?.();
								}
							}}
							onPaste={(event) => {
								if (browserEnv.NEXT_PUBLIC_ENABLE_IMAGE_UPLOAD) {
									const filesArray = Array.from(event.clipboardData.files);

									if (filesArray.length === 0) {
										return;
									}

									const imageFiles = filesArray.filter((file) =>
										/image/i.test(file.type)
									);

									if (imageFiles.length === 0) {
										return;
									}

									event.preventDefault();

									handleUploadImages(
										event.currentTarget,
										imageFiles,
										dispatch
									);
								}
							}}
							onDrop={(event) => {
								if (browserEnv.NEXT_PUBLIC_ENABLE_IMAGE_UPLOAD) {
									const filesArray = Array.from(event.dataTransfer.files);

									if (filesArray.length === 0) {
										return;
									}

									const imageFiles = filesArray.filter((file) =>
										/image/i.test(file.type)
									);

									if (imageFiles.length === 0) {
										return;
									}

									event.preventDefault();

									handleUploadImages(
										event.currentTarget,
										imageFiles,
										dispatch
									);
								}
							}}
							minRows={minRows}
						/>
					</TextareaMarkdown.Wrapper>

					<Suggestion
						state={suggestionState}
						onSelect={(suggestionResult: SuggestionResult) => {
							const preSuggestion = value.slice(
								0,
								suggestionState.triggerIdx!
							);
							const postSuggestion = value.slice(
								textareaMarkdownRef.current?.selectionStart
							);

							let suggestionInsertion = '';

							if (suggestionState.type === 'mention') {
								suggestionInsertion = `[${suggestionResult.label}](/profile/${suggestionResult.value})`;
							}

							if (suggestionState.type === 'emoji') {
								suggestionInsertion = suggestionResult.value;
							}

							const newEditorValue = `${preSuggestion}${suggestionInsertion} ${postSuggestion}`;

							onChange(newEditorValue);
							closeSuggestion();

							setTimeout(() => {
								const caretPosition =
									newEditorValue.length - postSuggestion.length;

								textareaMarkdownRef.current?.focus();
								textareaMarkdownRef.current?.setSelectionRange(
									caretPosition,
									caretPosition
								);
							}, 0);
						}}
						onClose={closeSuggestion}
					/>
				</>
			</TabPanel>
			<TabPanel value={tabValue} index={1}>
				<MarkdownPreview markdown={value} />
			</TabPanel>
		</Box>
	);
};

const Suggestion = ({
	state,
	onSelect,
	onClose,
}: {
	state: SuggestionState;
	onSelect: (suggestionResult: SuggestionResult) => void;
	onClose: () => void;
}) => {
	const isMentionType = state.type === 'mention';
	const isEmojiType = state.type === 'emoji';

	const emojiListQuery = useQuery(
		'emojiList',
		async () => {
			return (await import('gemoji')).gemoji;
		},
		{
			enabled: state.isOpen && isEmojiType,
			staleTime: Infinity,
		}
	);

	const mentionListQuery = trpc.useQuery(['user.mentionList'], {
		enabled: state.isOpen && isMentionType,
		staleTime: 5 * 60 * 1000,
	});

	let suggestionList: SuggestionResult[] = [];

	if (isMentionType && mentionListQuery.data) {
		suggestionList = matchSorter(mentionListQuery.data, state.query, {
			keys: ['name'],
		})
			.slice(0, 5)
			.map((item) => ({ label: item.name!, value: item.id }));
	}

	if (isEmojiType && emojiListQuery.data) {
		suggestionList = matchSorter(emojiListQuery.data, state.query, {
			keys: ['names', 'tags'],
			threshold: matchSorter.rankings.STARTS_WITH,
		})
			.slice(0, 5)
			.map((item) => ({
				label: `${item.emoji} ${item.names[0]}`,
				value: item.emoji,
			}));
	}

	if (!state.isOpen || !state.position || suggestionList.length === 0) {
		return null;
	}

	return (
		<SuggestionList
			suggestionList={suggestionList}
			position={state.position}
			onSelect={onSelect}
			onClose={onClose}
		/>
	);
};

const SuggestionList = ({
	suggestionList,
	position,
	onSelect,
	onClose,
}: {
	suggestionList: SuggestionResult[];
	position: SuggestionPosition;
	onSelect: (suggestionResult: SuggestionResult) => void;
	onClose: () => void;
}) => {
	const ref = useDetectClickOutside({ onTriggered: onClose });

	const { moveHighlightedItem, selectHighlightedItem, useItem } = useItemList({
		onSelect: (item) => {
			onSelect(item.value);
		},
	});

	useEffect(() => {
		function handleKeydownEvent(event: KeyboardEvent) {
			const { code } = event;

			const preventDefaultCodes = ['ArrowUp', 'ArrowDown', 'Enter', 'Tab'];

			if (preventDefaultCodes.includes(code)) {
				event.preventDefault();
			}

			if (code === 'ArrowUp') {
				moveHighlightedItem(-1);
			}

			if (code === 'ArrowDown') {
				moveHighlightedItem(1);
			}

			if (code === 'Enter' || code === 'Tab') {
				selectHighlightedItem();
			}
		}

		document.addEventListener('keydown', handleKeydownEvent);
		return () => {
			document.removeEventListener('keydown', handleKeydownEvent);
		};
	}, [moveHighlightedItem, selectHighlightedItem]);

	return (
		<div
			ref={ref}
			style={{
				top: position.top,
				left: position.left,
			}}
		>
			<ul role="listbox">
				{suggestionList.map((suggestionResult) => (
					<SuggestionResult
						key={suggestionResult.value}
						useItem={useItem}
						suggestionResult={suggestionResult}
					/>
				))}
			</ul>
		</div>
	);
};

const SuggestionResult = ({
	useItem,
	suggestionResult,
}: {
	useItem: ({ ref, text, value, disabled }: ItemOptions) => {
		id: string;
		index: number;
		highlight: () => void;
		select: () => void;
		selected: any;
		useHighlighted: () => Boolean;
	};
	suggestionResult: SuggestionResult;
}) => {
	const ref = useRef<HTMLLIElement>(null);
	const { id, index, highlight, select, useHighlighted } = useItem({
		ref,
		value: suggestionResult,
	});
	const highlighted = useHighlighted();

	return (
		<li
			ref={ref}
			id={id}
			onMouseEnter={highlight}
			onClick={select}
			role="option"
			aria-selected={highlighted ? 'true' : 'false'}
		>
			{suggestionResult.label}
		</li>
	);
};

export default MarkdownEditor;
