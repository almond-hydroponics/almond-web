// components
import { Link, Logo, Modal } from '@components/atoms';
import CustomAvatar from '@components/molecules/CustomAvatar';
import { mainLayoutNavigation } from '@layouts/navigation';
import {
	AccountCircleTwoTone,
	LocalGroceryStore,
	Menu,
} from '@mui/icons-material';
import {
	Avatar,
	Badge,
	Box,
	Chip,
	IconButton,
	Stack,
	Tooltip,
	Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import fancyId from '@utils/fancyId';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Form } from './components';

interface Props {
	// eslint-disable-next-line @typescript-eslint/ban-types
	onSidebarOpen: () => void;
	handleContactModal: () => void;
	colorInvert?: boolean;
}

const Topbar = ({
	onSidebarOpen,
	handleContactModal,
	colorInvert = false,
}: Props): JSX.Element => {
	const [openAuthModal, setAuthModalOpen] = useState<boolean>(false);
	const [authByEmail, setAuthByEmail] = useState<boolean>(false);
	const [activeLink, setActiveLink] = useState('');
	const { pathname } = useRouter();

	useEffect(() => {
		setActiveLink(window && window.location ? pathname : '');

		if (pathname === '/') {
			setActiveLink('');
		}
	}, [pathname]);

	const { data: session, status } = useSession();

	const handleAuthModal = () => {
		setAuthModalOpen((prevState) => !prevState);
		authByEmail && setAuthByEmail(false);
	};
	const router = useRouter();

	const renderStoreIcon = (): JSX.Element => (
		<Tooltip title="Check device activities">
			<Button
				component={Link}
				href={'/cart'}
				size={'small'}
				variant={'outlined'}
				aria-label="Dark mode toggler"
				color="primary"
				sx={{
					borderRadius: 1,
					minWidth: 'auto',
					padding: 0.5,
					marginRight: 2,
					// borderColor: alpha(theme.palette.divider, 0.2),
				}}
			>
				<Badge
					// overlap="circular"
					// variant="dot"
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					color="secondary"
					badgeContent={0}
				>
					<LocalGroceryStore fontSize={'small'} color="primary" />
				</Badge>
			</Button>
		</Tooltip>
	);

	const renderAuthButtons = () => (
		<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
			{status === 'authenticated' ? (
				<CustomAvatar />
			) : (
				<Chip
					size="medium"
					label="Account"
					variant="outlined"
					color="primary"
					onClick={handleAuthModal}
					avatar={
						<Avatar
							alt={'Anonymous User'}
							src={'/img/avatar_male.svg'}
							aria-describedby="menu-popover"
							aria-controls="menu-popover"
							aria-haspopup="true"
							typeof="button"
						/>
					}
				/>
			)}
		</Box>
	);

	const renderModalHeader = (): JSX.Element => (
		<Stack
			direction="row"
			justifyContent="flex-start"
			alignItems="center"
			spacing={2}
		>
			<AccountCircleTwoTone />
			<Typography>Login into your account</Typography>
		</Stack>
	);

	const renderAuthModal = (): JSX.Element => (
		<Modal
			isModalOpen={openAuthModal}
			renderHeader={renderModalHeader()}
			renderDialogText={''}
			renderContent={<Form />}
			onClose={handleAuthModal}
			onDismiss={handleAuthModal}
		/>
	);

	return (
		<Box
			display={'flex'}
			justifyContent={'space-between'}
			alignItems={'center'}
			width={1}
		>
			<Box sx={{ display: { xs: 'flex' } }} alignItems={'center'}>
				<Logo displayText />
			</Box>
			<Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'}>
				{mainLayoutNavigation.map((page, index) => (
					<Box key={fancyId()} marginLeft={index === 0 ? 0 : 4}>
						<Link href={page.href} noLinkStyle>
							<Typography
								color="primary"
								sx={{
									color:
										activeLink === page.href
											? 'primary.main'
											: 'text.secondary',
									cursor: 'pointer',
									'&:hover': {
										color: 'text.primary',
									},
								}}
							>
								{page.title}
							</Typography>
						</Link>
					</Box>
				))}
			</Box>

			<Box sx={{ display: 'flex' }} alignItems={'center'}>
				{renderStoreIcon()}
				{renderAuthButtons()}
				<Box
					sx={{ display: { xs: 'flex', md: 'none' } }}
					alignItems={'center'}
				>
					<IconButton
						onClick={onSidebarOpen}
						aria-label="Menu"
						sx={{ padding: 0, margin: 0 }}
					>
						<Menu fontSize={'medium'} />
					</IconButton>
				</Box>
			</Box>
			{renderAuthModal()}
		</Box>
	);
};

export default Topbar;
