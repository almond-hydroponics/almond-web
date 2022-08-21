import {
	LinearProgress,
	Pagination,
	PaginationItem,
	Typography,
} from '@mui/material';
import {
	GridOverlay,
	GridToolbarColumnsButton,
	GridToolbarContainer,
	GridToolbarDensitySelector,
	GridToolbarExport,
	GridToolbarFilterButton,
	useGridApiContext,
} from '@mui/x-data-grid';
import isBrowser from '@utils/isBrowser';
import { ChangeEvent } from 'react';

function CustomPagination() {
	const apiRef = useGridApiContext();
	const state = apiRef.current.state;

	return (
		<Pagination
			color="primary"
			variant="outlined"
			shape="rounded"
			page={state.pagination.page + 1}
			count={state.pagination.pageCount}
			// @ts-expect-error
			renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
			onChange={(event: ChangeEvent<unknown>, value: number) =>
				apiRef.current.setPage(value - 1)
			}
		/>
	);
}

function CustomLoadingOverlay() {
	return (
		<GridOverlay>
			<div style={{ position: 'absolute', top: 0, width: '100%' }}>
				<LinearProgress />
			</div>
		</GridOverlay>
	);
}

function CustomToolbar() {
	return (
		<GridToolbarContainer>
			<GridToolbarColumnsButton />
			<GridToolbarFilterButton />
			<GridToolbarDensitySelector />
			<GridToolbarExport />
		</GridToolbarContainer>
	);
}

function CustomNoRowsOverlay() {
	return (
		<GridOverlay style={{ backgroundColor: 'rgba(190,192,197,0.06)' }}>
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
				}}
			>
				<Typography>Sorry! No data available.</Typography>
			</div>
		</GridOverlay>
	);
}

function CustomErrorOverlay() {
	const text =
		isBrowser && window.navigator.onLine
			? 'Sorry! Error found on page. Kindly reload or adjust metrics.'
			: 'Sorry! You are offline. Check your connectivity then reload.';
	return (
		<GridOverlay style={{ backgroundColor: 'rgba(190,192,197,0.06)' }}>
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
				}}
			>
				<Typography>{text}</Typography>
			</div>
		</GridOverlay>
	);
}

export {
	CustomLoadingOverlay,
	CustomPagination,
	CustomToolbar,
	CustomNoRowsOverlay,
	CustomErrorOverlay,
};
