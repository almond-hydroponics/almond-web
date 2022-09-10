import { trpc } from '@lib/trpc';
import { Error, FiberManualRecord, Star, TaskAlt } from '@mui/icons-material';
import {
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Theme,
	Tooltip,
	styled,
	tableCellClasses,
	useMediaQuery,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Device } from '@prisma/client';
import { displaySnackMessage } from '@store/slices/snack';
import arrayIsEmpty from '@utils/arrayIsEmpty';
import fancyId from '@utils/fancyId';
import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';

import { DashboardContext } from '../../../../views/DashboardView/DashboardView';

interface Props {
	headers: any[];
	data: Device[];
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

const DeviceTable = ({ headers, data }: Props): JSX.Element => {
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

	const starredDevice = ({ id, starred }: StarredProps): JSX.Element => (
		<Tooltip title={starred ? 'Remove star' : 'Add star'}>
			<IconButton
				onClick={() => handleStarringDevices({ id, starred })}
				aria-label="delete"
				size="small"
				color={starred ? 'primary' : 'inherit'}
			>
				<Star fontSize="inherit" />
			</IconButton>
		</Tooltip>
	);

	if (arrayIsEmpty(data)) {
		return (
			<TableContainer
				sx={{
					minHeight: isSm ? 'unset' : '250px',
					maxHeight: isSm ? 'unset' : '250px',
				}}
			>
				<List sx={{ backgroundColor: 'alternate.main' }}>
					<ListItem>
						<ListItemIcon>
							<Error fontSize="small" />
						</ListItemIcon>
						<ListItemText
							color="alternate.main"
							primary="You have not starred any devices yet."
						/>
					</ListItem>
				</List>
			</TableContainer>
		);
	}

	return (
		<TableContainer
			sx={{
				minHeight: isSm ? 'unset' : '250px',
				maxHeight: isSm ? 'unset' : '250px',
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
							<StyledTableCell component="th" scope="row">
								{
									<IconButton aria-label="delete" size="small">
										<TaskAlt
											fontSize="inherit"
											sx={{
												color: row.active ? 'inherit' : 'transparent',
											}}
										/>
									</IconButton>
								}
								{starredDevice({
									id: row.id,
									starred: row?.starred as boolean,
								})}
							</StyledTableCell>
							<StyledTableCell>{row.name}</StyledTableCell>
							<StyledTableCell component="th" scope="row">
								{row.identifier}
							</StyledTableCell>
							<StyledTableCell align="right" component="th" scope="row">
								<Tooltip title={row.online ? 'Online' : 'Offline'}>
									<FiberManualRecord
										fontSize="small"
										sx={{
											color: row.online ? '#35A839' : '#E62634',
										}}
									/>
								</Tooltip>
							</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default DeviceTable;
