import { ComponentContext } from '@context/ComponentContext';
import {
	AccountCircleOutlined,
	HelpOutline,
	Logout,
	Mood,
	OpenInNew,
} from '@mui/icons-material';
import {
	Avatar,
	Button,
	Chip,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Tooltip,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import fancyId from '@utils/fancyId';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { MouseEvent, useContext, useState } from 'react';

interface Props {
	hasMultipleRoles?: boolean;

	[x: string]: any;
}

const CustomAvatar = ({
	hasMultipleRoles = false,
	...rest
}: Props): JSX.Element => {
	const router = useRouter();
	const theme = useTheme();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const { data: session } = useSession();

	const { name, image } = session?.user || {
		name: 'Anonymous User',
		image: '/img/avatar_male.svg',
	};

	const handleToggleProfileMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleProfileClose = () => setAnchorEl(null);

	const { toggleRoleChangeDialog } = useContext(ComponentContext);

	const handleRoleModal = () => {
		handleProfileClose();
		toggleRoleChangeDialog();
	};

	const logoutActiveUser = async (e): Promise<void> => {
		e.preventDefault();
		await signOut({
			callbackUrl: `${window.location.origin}`,
			redirect: false,
		});
		// await router.push('/');
	};

	const open = Boolean(anchorEl);

	let menuItems = [
		{
			name: 'Profile',
			icon: <AccountCircleOutlined fontSize="small" />,
			link: 'account',
			secondaryText: 'Account settings',
		},
		{
			name: 'Help',
			icon: <HelpOutline fontSize="small" />,
			link: 'help',
			secondaryText: 'Find support',
		},
		{
			name: 'Send Feedback',
			icon: <OpenInNew fontSize="small" />,
			link: 'send-feedback',
			secondaryText: 'Help improve almond',
		},
	];

	return (
		<>
			<Tooltip title={name ?? 'Anonymous User'}>
				<Chip
					size="medium"
					label={name ?? 'Anonymous User'}
					variant="outlined"
					color="primary"
					onClick={handleToggleProfileMenu}
					avatar={
						<Avatar
							alt={name ?? 'Anonymous User'}
							src={image ?? '/img/avatar_male.svg'}
							aria-describedby="menu-popover"
							aria-controls="menu-popover"
							aria-haspopup="true"
							typeof="button"
							{...rest}
						/>
					}
				/>
			</Tooltip>
			<Menu
				id="menu-popover"
				anchorEl={anchorEl}
				open={open}
				onClose={handleProfileClose}
				onClick={handleProfileClose}
				PaperProps={{
					elevation: 0,
					sx: {
						border: `0.6px solid ${alpha(theme.palette.divider, 0.3)}`,
						width: 270,
						maxWidth: '100%',
						zIndex: theme.zIndex.appBar + 1,
						overflow: 'visible',
						// filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
						mt: 1.5,
						'& .MuiAvatar-root': {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						// '&:before': {
						// 	content: '""',
						// 	display: 'block',
						// 	position: 'absolute',
						// 	top: 0,
						// 	right: 14,
						// 	width: 10,
						// 	height: 10,
						// 	bgcolor: 'background.paper',
						// 	transform: 'translateY(-50%) rotate(45deg)',
						// 	zIndex: theme.zIndex.appBar + 1,
						// 	border: `0.6px solid ${alpha(theme.palette.divider, 0.3)}`,
						// },
					},
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				{menuItems.map((item) => {
					const handleClick = async () => {
						handleProfileClose();
						await router.push(item.link);
					};
					return (
						<MenuItem
							key={fancyId()}
							onClick={handleClick}
							sx={{
								borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
								paddingY: 1,
							}}
						>
							<ListItemIcon sx={{ minWidth: 44, marginRight: 1 }}>
								<Avatar
									sx={{
										backgroundColor: '#e8f0fe',
										color: theme.palette.primary.main,
									}}
								>
									{item.icon}
								</Avatar>
							</ListItemIcon>
							<ListItemText
								primary={item.name}
								secondary={item.secondaryText}
							/>
						</MenuItem>
					);
				})}
				{router.pathname === '/dashboard' && hasMultipleRoles && (
					<MenuItem onClick={handleRoleModal}>
						<ListItemIcon>
							<Mood fontSize="small" />
						</ListItemIcon>
						Change role
					</MenuItem>
				)}

				<MenuItem>
					<Button
						fullWidth
						variant="contained"
						type="submit"
						color="primary"
						startIcon={<Logout />}
						onClick={logoutActiveUser}
					>
						Logout
					</Button>
				</MenuItem>
			</Menu>
		</>
	);
};

export default CustomAvatar;
