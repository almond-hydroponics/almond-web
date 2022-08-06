// components
import Logo from '@components/atoms/Logo';
import Modal from '@components/atoms/Modal';
import CustomAvatar from '@components/molecules/CustomAvatar';
import {
	AccountCircleTwoTone,
	ArrowBack,
	DragHandleRounded,
} from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
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
	const handleAuthByEmail = () => setAuthByEmail((prevState) => !prevState);

	const renderAuthButtons = () => (
		<Box marginLeft={3} sx={{ display: { xs: 'none', md: 'flex' } }}>
			{!!session ? (
				<CustomAvatar />
			) : (
				<Button
					variant="text"
					color="primary"
					onClick={handleAuthModal}
					sx={{
						color: linkColor,
						'&:hover': {
							color: colorInvert ? 'common.white' : 'primary.dark',
						},
					}}
				>
					Login
				</Button>
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
			{authByEmail ? (
				<ArrowBack onClick={handleAuthByEmail} />
			) : (
				<AccountCircleTwoTone />
			)}
			<Typography variant="h6">Login into your account</Typography>
		</Stack>
	);

	const renderAuthModal = (): JSX.Element => (
		<Modal
			maxWidth="xs"
			isModalOpen={openAuthModal}
			renderHeader={renderModalHeader()}
			renderDialogText={
				authByEmail ? '' : 'Choose your preferred method to authenticate'
			}
			renderContent={
				<Form
					handleAuthModal={handleAuthModal}
					authByEmail={authByEmail}
					handleAuthByEmail={handleAuthByEmail}
				/>
			}
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
				<Box marginLeft={3}>
					<Link href="/resources" passHref>
						<Button
							sx={{
								color: linkColor,
								'&:hover': {
									color: colorInvert ? 'common.white' : 'primary.dark',
								},
							}}
							variant="text"
						>
							Resources
						</Button>
					</Link>
				</Box>

				<Box marginLeft={3}>
					<Link href="/store" passHref>
						<Button
							sx={{
								color: linkColor,
								'&:hover': {
									color: colorInvert ? 'common.white' : 'primary.dark',
								},
							}}
							variant="text"
						>
							Store
						</Button>
					</Link>
				</Box>

				<Box marginLeft={3}>
					<Link href="/blog" passHref>
						<Button
							sx={{
								color: linkColor,
								'&:hover': {
									color: colorInvert ? 'common.white' : 'primary.dark',
								},
							}}
							variant="text"
						>
							Latest news
						</Button>
					</Link>
				</Box>

				<Box marginLeft={3}>
					<Button
						sx={{
							color: linkColor,
							'&:hover': {
								color: colorInvert ? 'common.white' : 'primary.dark',
							},
						}}
						variant="text"
						onClick={handleContactModal}
					>
						Contact us
					</Button>
				</Box>
			</Box>

			{renderAuthButtons()}

			<Box sx={{ display: { xs: 'flex', md: 'none' } }} alignItems={'center'}>
				<Button
					onClick={() => onSidebarOpen()}
					aria-label="Menu"
					variant={'text'}
					size={'small'}
					sx={{
						color: linkColor,
						'&:hover': {
							color: colorInvert ? 'common.white' : 'primary.dark',
						},
						borderRadius: 1,
						minWidth: 'auto',
						padding: 0,
						marginLeft: 2,
						// borderColor: alpha(theme.palette.divider, 0.2),
					}}
				>
					<DragHandleRounded fontSize={'medium'} />
				</Button>
			</Box>
		</Box>
	);
};

export default Topbar;
