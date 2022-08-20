// components
import { Link, Logo, Modal } from '@components/atoms';
import CustomAvatar from '@components/molecules/CustomAvatar';
import { AccountCircleTwoTone, Menu } from '@mui/icons-material';
import {
	Avatar,
	Box,
	Chip,
	IconButton,
	Stack,
	Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

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
	const theme = useTheme();
	const { data: session } = useSession();
	const linkColor = colorInvert ? 'common.white' : 'text.primary';

	const handleAuthModal = () => {
		setAuthModalOpen((prevState) => !prevState);
		authByEmail && setAuthByEmail(false);
	};
	const router = useRouter();

	const renderAuthButtons = () => (
		<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
			{!!session ? (
				<CustomAvatar />
			) : (
				<Chip
					size="medium"
					label="Login"
					variant="outlined"
					color="primary"
					onClick={() => router.push('/login')}
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
				<Box>
					<Link href="/resources" noLinkStyle>
						<Typography
							color="primary"
							sx={{
								color: 'text.secondary',
								cursor: 'pointer',
								'&:hover': {
									color: 'text.primary',
								},
							}}
						>
							Resources
						</Typography>
					</Link>
				</Box>

				<Box marginLeft={4}>
					<Link href="/store" noLinkStyle>
						<Typography
							color="primary"
							sx={{
								color: 'text.secondary',
								cursor: 'pointer',
								'&:hover': {
									color: 'text.primary',
								},
							}}
						>
							Store
						</Typography>
					</Link>
				</Box>

				<Box marginLeft={4}>
					<Link href="/blog" noLinkStyle>
						<Typography
							color="primary"
							sx={{
								color: 'text.secondary',
								cursor: 'pointer',
								'&:hover': {
									color: 'text.primary',
								},
							}}
						>
							Our Latest
						</Typography>
					</Link>
				</Box>

				<Box marginLeft={4}>
					<Typography
						onClick={handleContactModal}
						color="primary"
						sx={{
							color: 'text.secondary',
							cursor: 'pointer',
							'&:hover': {
								color: 'text.primary',
							},
						}}
					>
						Contact
					</Typography>
				</Box>
			</Box>

			{renderAuthButtons()}

			<Box sx={{ display: { xs: 'flex', md: 'none' } }} alignItems={'center'}>
				<IconButton
					onClick={onSidebarOpen}
					aria-label="Menu"
					sx={{ padding: 0, margin: 0 }}
				>
					<Menu fontSize={'medium'} />
				</IconButton>
			</Box>
			{renderAuthModal()}
		</Box>
	);
};

export default Topbar;
