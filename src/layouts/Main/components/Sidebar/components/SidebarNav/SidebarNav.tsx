import { Link, Logo, Modal } from '@components/atoms';
import Container from '@components/Container';
import { UserContext } from '@context/UserContext';
import {
	AccountCircleTwoTone,
	ArrowBack,
	PolicyTwoTone,
} from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import {
	Avatar,
	Box,
	Button,
	Chip,
	Divider,
	IconButton,
	Stack,
	Typography,
} from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

import packageJson from '../../../../../../../package.json';
import pages from '../../../../../navigation';
import { Form } from '../../../Topbar/components';
import NavItem from './components/NavItem';

interface Props {
	// eslint-disable-next-line @typescript-eslint/ban-types
	onClose: () => void;
	handleContactModal: () => void;
}

const SidebarNav = ({ onClose, handleContactModal }: Props): JSX.Element => {
	const router = useRouter();
	const [openAuthModal, setAuthModalOpen] = useState<boolean>(false);
	const [authByEmail, setAuthByEmail] = useState<boolean>(false);

	const { data: session } = useSession();

	const handleAuthModal = () => {
		setAuthModalOpen((prevState) => !prevState);
		authByEmail && setAuthByEmail(false);
	};
	const handleAuthByEmail = () => setAuthByEmail((prevState) => !prevState);
	const { name, photo } = useContext(UserContext);

	const logoutActiveUser = async (e): Promise<void> => {
		e.preventDefault();
		await signOut({
			callbackUrl: `${window.location.origin}`,
			redirect: false,
		});
	};

	const renderAuthButtons = () => (
		<Box>
			<Button
				fullWidth
				variant="outlined"
				color="primary"
				size="medium"
				onClick={!!session ? logoutActiveUser : handleAuthModal}
			>
				{!!session ? 'Logout' : 'Account'}
			</Button>
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
			isModalOpen={openAuthModal}
			renderHeader="Login into your account"
			renderDialogText="Choose your preferred method to authenticate into your account"
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

	const accountAvatar = () => {
		return (
			<Stack
				direction="row"
				alignItems="center"
				justifyContent="space-between"
				spacing={2}
			>
				<Chip
					size="medium"
					label={name || 'Anonymous'}
					// variant="outlined"
					avatar={
						<Avatar
							alt={name || 'Anonymous'}
							src={
								photo ||
								'https://storage.googleapis.com/static.almondhydroponics.com/static/images/avatar_male.svg'
							}
							aria-describedby="menu-popover"
							aria-controls="menu-popover"
							aria-haspopup="true"
							typeof="button"
						/>
					}
				/>
			</Stack>
		);
	};

	return (
		<Box>
			<Stack
				direction="row"
				alignItems="center"
				justifyContent="space-between"
			>
				{!!session ? accountAvatar() : <Logo displayText />}
				<Box
					display={'flex'}
					justifyContent={'flex-end'}
					onClick={() => onClose()}
				>
					<IconButton>
						<CloseIcon fontSize="medium" />
					</IconButton>
				</Box>
			</Stack>
			<Box paddingX={2} paddingBottom={2}>
				<Box>
					<NavItem
						title={''}
						items={pages}
						handleContactModal={handleContactModal}
					/>
				</Box>
				<Divider sx={{ marginBottom: 2 }} />
				{renderAuthButtons()}
				<Box marginTop={2}>
					<Button
						variant="contained"
						color="primary"
						fullWidth
						component="a"
						target="blank"
						onClick={() => router.push('/store')}
					>
						Go to store
					</Button>
				</Box>
				{renderAuthModal()}
			</Box>
			<Container paddingY={2} sx={{ bottom: 0, position: 'fixed' }}>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					spacing={2}
				>
					<Button
						component={Link}
						href="company-terms"
						startIcon={<PolicyTwoTone />}
						sx={{ color: 'text.primary', paddingX: 0 }}
					>
						Legal
					</Button>
					<Typography variant={'caption'} fontWeight={300}>
						{`v${packageJson.version}`}
					</Typography>
				</Stack>
			</Container>
		</Box>
	);
};

export default SidebarNav;
