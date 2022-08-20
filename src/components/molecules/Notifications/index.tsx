import {
	FilePresentTwoTone,
	Notifications as NewNotifications,
	NotificationsNoneRounded,
} from '@mui/icons-material';
import {
	Avatar,
	Badge,
	Button,
	Chip,
	Divider,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Menu,
	Tooltip,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { RootState } from '@store/index';
import { readNotification } from '@store/slices/notifications';
import fancyId from '@utils/fancyId';
import { MouseEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Notifications = (): JSX.Element => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const theme = useTheme();
	const { mode } = theme.palette;
	const dispatch = useDispatch();

	const { notifications } = useSelector(
		(store: RootState) => store.notifications
	);

	const unreadNotifications: number = notifications.filter(
		(notification) => notification.read === false
	).length;

	const handleNotificationsClick = (event: MouseEvent<HTMLElement>) => {
		open ? handleNotificationsClose() : setAnchorEl(event.currentTarget);
	};

	const handleNotificationsClose = () => setAnchorEl(null);

	const handleDownloadClick =
		({ id, url, filename }: { id: string; url: string; filename: string }) =>
		(event) => {
			event.preventDefault();
			dispatch(readNotification({ id }));

			const link = document.createElement('a');
			link.href = url;
			link.download = filename;
			document.body.append(link);
			link.click();
			link.remove();
			// in case the Blob uses a lot of memory
			setTimeout(() => URL.revokeObjectURL(link.href), 7000);

			// downloadFile(url, "problems")
			// window.open(url, '_blank');
		};

	const renderNotificationsModal = (): JSX.Element => (
		<Menu
			anchorEl={anchorEl}
			open={open}
			onClose={handleNotificationsClose}
			onClick={handleNotificationsClose}
			PaperProps={{
				elevation: 0,
				sx: {
					width: 400,
					maxWidth: '100%',
					zIndex: theme.zIndex.appBar + 1,
					overflow: 'visible',
					filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
					mt: 1.5,
					minHeight: '100px',
					'& .MuiAvatar-root': {
						width: 32,
						height: 32,
						ml: -0.5,
						mr: 1,
					},
					'&:before': {
						content: '""',
						display: 'block',
						position: 'absolute',
						top: 10,
						right: 14,
						width: 10,
						height: 10,
						bgcolor: 'background.paper',
						transform: 'translateY(-50%) rotate(45deg)',
						zIndex: theme.zIndex.appBar + 1,
					},
				},
			}}
			transformOrigin={{ horizontal: 'right', vertical: 'top' }}
			anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
		>
			<ListItem key={fancyId()} divider>
				<ListItemText
					primary={`${
						notifications.length === 0 ? 'No' : 'All'
					} notifications`}
					primaryTypographyProps={{ fontWeight: 600 }}
				/>
				{notifications.length > 0 ? (
					<Chip
						color="secondary"
						size="small"
						sx={{
							fontWeight: 500,
						}}
						label={`${unreadNotifications} new`}
					/>
				) : null}
			</ListItem>

			{notifications.map((item) => {
				const handleClick = () => {
					handleNotificationsClose();
				};
				return (
					<div key={fancyId()}>
						<ListItem
							id={item.id}
							sx={{
								cursor: 'pointer',
								paddingRight: 12,
								backgroundColor: item.read
									? 'inherit'
									: alpha(theme.palette.primary.main, 0.1),
							}}
						>
							<ListItemAvatar>
								<Avatar>
									<FilePresentTwoTone />
								</Avatar>
							</ListItemAvatar>
							<ListItemText
								primary={item.primaryText}
								primaryTypographyProps={{ fontWeight: 500 }}
								secondaryTypographyProps={{ fontWeight: 400 }}
								secondary={item.secondaryText}
							/>
						</ListItem>
						<Divider variant="inset" component="li" />
					</div>
				);
			})}

			{notifications.length > 5 ? (
				<ListItem key={fancyId()}>
					<Button
						fullWidth
						variant="contained"
						type="submit"
						color="primary"
						size="small"
					>
						View more
					</Button>
				</ListItem>
			) : null}
		</Menu>
	);

	const renderNotificationsIcon = (): JSX.Element => (
		<Tooltip title="Notifications">
			<Button
				variant={'outlined'}
				aria-label="notifications-toggler"
				color={mode === 'light' ? 'primary' : 'secondary'}
				onClick={handleNotificationsClick}
				sx={{
					borderRadius: 1,
					minWidth: 'auto',
					padding: 0.5,
				}}
			>
				<Badge
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					color="error"
					badgeContent={unreadNotifications}
				>
					{unreadNotifications > 0 ? (
						<NewNotifications fontSize={'small'} color="primary" />
					) : (
						<NotificationsNoneRounded fontSize={'small'} color="primary" />
					)}
				</Badge>
			</Button>
		</Tooltip>
	);

	return (
		<>
			{renderNotificationsIcon()}
			{renderNotificationsModal()}
		</>
	);
};

export default Notifications;
