import { trpc } from '@lib/trpc';
import { Error, FiberManualRecord } from '@mui/icons-material';
import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Theme,
	Tooltip,
	Typography,
	styled,
	tableCellClasses,
	useMediaQuery,
} from '@mui/material';
import { red } from '@mui/material/colors';
import { alpha } from '@mui/material/styles';
import { Schedule } from '@prisma/client';
import { displaySnackMessage } from '@store/slices/snack';
import arrayIsEmpty from '@utils/arrayIsEmpty';
import fancyId from '@utils/fancyId';
import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';

import { DashboardContext } from '../../../DashboardView/DashboardView';

interface Props {
	headers: any[];
	data: Schedule[];
}

interface StarredProps {
	id: string;
	starred: boolean;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: alpha(theme.palette.alternate.main, 0.5),
		color: theme.palette.primary.main,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(even)': {
		// backgroundColor: alpha(theme.palette.alternate.main, 0.3),
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		// border: 0,
	},
	'&:hover': {
		// backgroundColor: alpha(theme.palette.primary.main, 0.1),
		// backgroundColor: theme.palette.alternate.main,
	},
}));

const WaterTable = ({ headers, data }: Props): JSX.Element => {
	const [activeRow, setActiveRow] = useState('');
	const dispatch = useDispatch();
	const { handleDeviceSelect } = useContext(DashboardContext);

	const isSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

	const editDeviceMutation = trpc.useMutation('device.edit', {
		onError: (error) => {
			dispatch(
				displaySnackMessage({
					message: error.message,
					severity: 'error',
				})
			);
		},
	});

	const handleStarringDevices = ({ id, starred }: StarredProps) => {
		editDeviceMutation.mutate({
			id,
			data: {
				starred: !starred,
			},
		});
	};

	const handleDeviceSelectionFromRow = (id: string) => {
		setActiveRow(id);
		handleDeviceSelect(id);
	};

	const renderActionButtons = (id: string): JSX.Element => {
		return (
			<Stack direction="row" spacing={1} key={id}>
				<Typography
					style={{ cursor: 'pointer', paddingRight: 12 }}
					id={id}
					variant="body2"
					color="primary"
					// onClick={showDeviceModal('Edit')}
					// onKeyDown={showDeviceModal('Edit')}
				>
					Edit
				</Typography>
				<Typography
					style={{ cursor: 'pointer', color: red[900] }}
					id={id}
					variant="body2"
					// onClick={handleDelete}
					// onKeyDown={handleDelete}
				>
					Delete
				</Typography>
			</Stack>
		);
	};

	if (arrayIsEmpty(data)) {
		return (
			<TableContainer
				sx={{
					minHeight: isSm ? 'unset' : '50vh',
					maxHeight: isSm ? 'unset' : '50vh',
				}}
			>
				<List sx={{ backgroundColor: 'alternate.main' }}>
					<ListItem>
						<ListItemIcon>
							<Error fontSize="small" />
						</ListItemIcon>
						<ListItemText
							color="alternate.main"
							primary="You do not have any schedules yet."
						/>
					</ListItem>
				</List>
			</TableContainer>
		);
	}

	return (
		<TableContainer
			sx={{
				minHeight: isSm ? 'unset' : '50vh',
				maxHeight: isSm ? 'unset' : '50vh',
				paddingY: 2,
			}}
		>
			<Table size="small" aria-label="a dense table">
				<TableHead>
					<StyledTableRow>
						{headers.map((header) => (
							<StyledTableCell key={fancyId()}>{header}</StyledTableCell>
						))}
					</StyledTableRow>
				</TableHead>
				<TableBody>
					{data.map((row) => (
						<StyledTableRow
							key={row.id}
							sx={{
								cursor: 'pointer',
								backgroundColor:
									row.id === activeRow
										? (theme) => alpha(theme.palette.primary.main, 0.1)
										: 'inherit',
							}}
							onClick={() => handleDeviceSelectionFromRow(row.id)}
						>
							<StyledTableCell align="right" component="th" scope="row">
								<Tooltip title={row.enabled ? 'Active' : 'Off'}>
									<FiberManualRecord
										fontSize="small"
										sx={{
											color: row.enabled ? '#00b0f0' : '#ff1744',
										}}
									/>
								</Tooltip>
							</StyledTableCell>
							<StyledTableCell>
								<Typography variant="body2">{row.schedule}</Typography>
							</StyledTableCell>
							<StyledTableCell component="th" scope="row">
								{renderActionButtons(row.id)}
							</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default WaterTable;
