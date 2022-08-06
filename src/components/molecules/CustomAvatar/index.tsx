import { Avatar, Menu, MenuItem, ListItemIcon, Tooltip } from '@mui/material';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import fancyId from '@utils/fancyId';
import { useState, MouseEvent, useContext } from 'react';
import { Help, Logout, Mood, OpenInNew, Settings } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { UserContext } from '@context/UserContext';
import { useTheme } from '@mui/material/styles';
import { ComponentContext } from '@context/ComponentContext';

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

	const { name } = useContext(UserContext);
	const photo =
		'https://storage.googleapis.com/static.almondhydroponics.com/static/images/avatar_male.svg';

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
	};

	const open = Boolean(anchorEl);

	let menuItems = [
		{ name: 'Settings', icon: <Settings fontSize="small" />, link: 'account' },
		{ name: 'Help', icon: <Help fontSize="small" />, link: 'help' },
		{
			name: 'Send Feedback',
			icon: <OpenInNew fontSize="small" />,
			link: 'send-feedback',
		},
	];

	if (router.pathname === '/') {
		menuItems = menuItems.filter((item) => {
			return item.name !== 'Settings';
		});
	}

	return (
		<div>
			<Tooltip title="Account settings">
				<Avatar
					alt={name}
					src={photo}
					onClick={handleToggleProfileMenu}
					aria-describedby="menu-popover"
					aria-controls="menu-popover"
					aria-haspopup="true"
					typeof="button"
					{...rest}
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
						zIndex: theme.zIndex.drawer + 1,
						overflow: 'visible',
						filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
						mt: 1.5,
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
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: 'background.paper',
							transform: 'translateY(-50%) rotate(45deg)',
							zIndex: 0,
						},
					},
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				{menuItems.map((item) => {
					const handleClick = () => {
						handleProfileClose();
						router.push(item.link);
					};
					return (
						<MenuItem key={fancyId()} onClick={handleClick}>
							<ListItemIcon>{item.icon}</ListItemIcon>
							{item.name}
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

				<MenuItem onClick={logoutActiveUser}>
					<ListItemIcon>
						<Logout fontSize="small" />
					</ListItemIcon>
					Logout
				</MenuItem>
			</Menu>
		</div>
	);
};

export default CustomAvatar;
