import { Box, Paper, Popper, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { GridCellParams } from '@mui/x-data-grid';
import fancyId from '@utils/fancyId';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

interface CellExpandProps {
	value: string;
	width: number;
}

function isOverflown(element) {
	return (
		element.scrollHeight > element.clientHeight ||
		element.scrollWidth > element.clientWidth
	);
}

export const CellExpand = memo(function CellExpand(props: CellExpandProps) {
	const { width, value } = props;
	const theme = useTheme();
	const wrapper = useRef<HTMLDivElement | null>(null);
	const cellDiv = useRef(null);
	const cellValue = useRef(null);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const [showFullCell, setShowFullCell] = useState(false);
	const [showPopper, setShowPopper] = useState(false);

	const showCell = useCallback(() => {
		setShowFullCell(true);
	}, []);

	const hideCell = useCallback(() => {
		setShowFullCell(false);
	}, []);

	useEffect(() => {
		if (cellDiv.current) {
			setAnchorEl(cellDiv.current);
		}
	}, []);

	useEffect(() => {
		if (cellValue && cellValue.current) {
			const isCurrentlyOverflown = isOverflown(cellValue.current!);
			setShowPopper(isCurrentlyOverflown);
		}
	}, [width]);

	return (
		<Box
			ref={wrapper}
			onMouseEnter={showCell}
			onMouseLeave={hideCell}
			sx={{
				alignItems: 'center',
				lineHeight: '24px',
				width: 1,
				height: 1,
				position: 'relative',
				display: 'flex',
			}}
		>
			<Box
				ref={cellDiv}
				sx={{
					height: 1,
					width,
					display: 'block',
					position: 'absolute',
					top: 0,
				}}
			/>
			<Box
				ref={cellValue}
				sx={{
					whiteSpace: 'nowrap',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
				}}
			>
				{value}
			</Box>
			{showPopper && (
				<Popper
					id={fancyId()}
					open={showFullCell && anchorEl !== null}
					anchorEl={anchorEl}
					style={{ width, marginLeft: -17 }}
				>
					<Paper
						elevation={1}
						style={{
							minHeight: wrapper.current!.offsetHeight - 3,
							border: `0.6px solid ${alpha(theme.palette.divider, 0.3)}`,
						}}
					>
						<Typography variant="body2" style={{ padding: 8 }}>
							{value}
						</Typography>
					</Paper>
				</Popper>
			)}
		</Box>
	);
});

const RenderCellExpand = (params: GridCellParams) => {
	return (
		<CellExpand
			value={params.value || ''}
			width={params.colDef.computedWidth}
		/>
	);
};

export default RenderCellExpand;
