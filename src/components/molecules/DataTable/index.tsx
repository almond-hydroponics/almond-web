import {
	CustomErrorOverlay,
	CustomLoadingOverlay,
	CustomNoRowsOverlay,
} from '@components/atoms';
import { Divider } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import {
	DataGrid,
	GridColDef,
	GridLinkOperator,
	GridToolbarColumnsButton,
	GridToolbarContainer,
	GridToolbarDensitySelector,
	GridToolbarFilterButton,
} from '@mui/x-data-grid';

import { useTableStyles } from '../../../views/styles';

interface Props {
	rows: any;
	columns: GridColDef[];
	onSelectionModel?: (newSelectionModel) => void;
	selectionModel?: any;
	isLoading?: boolean;
	onRowDoubleClick?: () => void;
	error?: any;

	[x: string]: any;
}

const DataTable = ({
	rows,
	columns,
	onSelectionModel,
	selectionModel,
	isLoading,
	onRowDoubleClick,
	error = undefined,
	...rest
}: Props): JSX.Element => {
	const classes = useTableStyles();
	const theme = useTheme();

	const customToolbar = () => {
		return (
			<GridToolbarContainer>
				<GridToolbarColumnsButton />
				<Divider orientation="vertical" variant="middle" flexItem />
				<GridToolbarFilterButton />
				<Divider orientation="vertical" variant="middle" flexItem />
				<GridToolbarDensitySelector />
			</GridToolbarContainer>
		);
	};

	return (
		<div style={{ height: '85vh', width: '100%', padding: '12px' }}>
			<div style={{ display: 'flex', height: '100%' }}>
				<div style={{ flexGrow: 1 }} className={classes.root}>
					<DataGrid
						{...rest}
						rows={rows}
						columns={columns.map((column) => ({
							...column,
							disableClickEventBubbling: true,
						}))}
						autoPageSize
						pagination
						density="standard"
						components={{
							// Toolbar: customToolbar,
							// Pagination: CustomPagination,
							LoadingOverlay: CustomLoadingOverlay,
							NoRowsOverlay: CustomNoRowsOverlay,
							ErrorOverlay: CustomErrorOverlay,
						}}
						onRowDoubleClick={onRowDoubleClick}
						onSelectionModelChange={onSelectionModel}
						selectionModel={selectionModel}
						loading={isLoading}
						error={error}
						componentsProps={{
							filterPanel: {
								// Force usage of "And" operator
								linkOperators: [GridLinkOperator.And],
								// Display columns by ascending alphabetical order
								columnsSort: 'asc',
								filterFormProps: {
									// Customize inputs by passing props
									linkOperatorInputProps: {
										variant: 'outlined',
										size: 'small',
									},
									columnInputProps: {
										variant: 'outlined',
										size: 'small',
										sx: { mt: 'auto' },
									},
									operatorInputProps: {
										variant: 'outlined',
										size: 'small',
										sx: { mt: 'auto' },
									},
									deleteIconProps: {
										sx: {
											'& .MuiSvgIcon-root': { color: '#d32f2f' },
										},
									},
								},
								sx: {
									border: `0.6px solid ${alpha(theme.palette.divider, 0.3)}`,
									// Customize inputs using css selectors
									'& .MuiDataGrid-filterForm': { p: 2 },
									'& .MuiDataGrid-filterForm:nth-child(even)': {
										backgroundColor: (theme) =>
											theme.palette.mode === 'dark' ? '#444' : '#f5f5f5',
									},
									'& .MuiDataGrid-filterFormLinkOperatorInput': { mr: 2 },
									'& .MuiDataGrid-filterFormColumnInput': {
										mr: 2,
										width: 150,
									},
									'& .MuiDataGrid-filterFormOperatorInput': { mr: 2 },
									'& .MuiDataGrid-filterFormValueInput': { width: 200 },
								},
							},
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default DataTable;
