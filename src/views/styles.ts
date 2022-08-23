import { Theme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';

export const useTableStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			border: 0,
			WebkitFontSmoothing: 'auto',
			'& .MuiDataGrid-root': {
				border: 'none',
			},
			'& .MuiDataGridIconSeparator': {
				display: 'none',
			},
			'& .MuiDataGrid-cell': {
				// fontSize: 12,
				color: theme.palette.text.secondary,
				fontWeight: 400,
				// [theme.breakpoints.down('sm')]: {
				// 	fontSize: 12,
				// 	color: theme.palette.text.secondary,
				// },
			},
			'& .MuiDataGrid-columnSeparator': {
				display: 'none !important',
			},
			'& .MuiDataGridCell:focusWithin': {
				// outline: 'solid #1967D2 0.8px',
				outlineOffset: '-1px',
				outline: 'none',
			},
			// '& .MuiDataGrid-colCell, .MuiDataGrid-cell': {
			// 	paddingLeft: 2,
			// 	paddingRight: 2,
			// },
			'& .MuiPaginationItemRoot': {
				borderRadius: 0,
			},
			// '& .MuiDataGrid-columnHeaders': {
			// 	backgroundColor: theme.palette.alternate.dark,
			// },
			'& .MuiDataGrid-columnHeaderTitleContainer': {
				padding: '0 !important',
			},
			'& .MuiDataGrid-columnHeaderTitle': {
				color: theme.palette.text.secondary,
				fontWeight: 400,
			},
			'& .MuiDataGrid-row:nth-child(even)': {
				backgroundColor: alpha(theme.palette.alternate.dark, 0.3),
			},
			'& .data-cell-grid.active': {
				backgroundColor: '#D9E9BA',
				color: '#3E4E56',
				borderColor: '#ffffff',
				fontWeight: 400,
			},
			'& .data-cell-grid.verify': {
				color: '#282B2D',
				backgroundColor: '#B9E3FD',
				borderColor: '#ffffff',
				fontWeight: 500,
			},
			'& .data-cell-grid.inactive': {
				backgroundColor: '#F9E3E3',
				color: '#980910',
				borderColor: '#ffffff',
				fontWeight: 500,
			},
			'& .MuiDataGrid-footerContainer': {
				borderTop: 'none',
			},
		},
	})
);
