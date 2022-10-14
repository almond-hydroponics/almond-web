import { ContentCopy } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { ReactNode, useRef, useState } from 'react';

interface Props {
	children: ReactNode;
}

const Pre = ({ children }: Props) => {
	const textInput = useRef(null);
	const [hovered, setHovered] = useState(false);
	const [copied, setCopied] = useState(false);

	const onEnter = () => {
		setHovered(true);
	};
	const onExit = () => {
		setHovered(false);
		setCopied(false);
	};
	const onCopy = async () => {
		setCopied(true);
		// @ts-expect-error
		await navigator.clipboard.writeText(textInput.current.textContent);
		setTimeout(() => {
			setCopied(false);
		}, 2000);
	};

	return (
		<Box
			component={'div'}
			ref={textInput}
			onMouseEnter={onEnter}
			onMouseLeave={onExit}
			position="relative"
		>
			{hovered && (
				<IconButton
					aria-label="Copy code"
					type="button"
					size="small"
					onClick={onCopy}
					// color={copied ? 'secondary' : 'inherit'}
					sx={{
						position: 'absolute',
						right: '16px',
						top: '16px',
						height: '8px',
						width: '8px',
						color: '#f8f9fa',
					}}
				>
					<ContentCopy
						fontSize="small"
						color={copied ? 'secondary' : 'inherit'}
					/>
				</IconButton>
			)}

			<pre>{children}</pre>
		</Box>
	);
};

export default Pre;
