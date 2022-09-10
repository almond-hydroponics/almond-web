import { KeyboardArrowUpRounded } from '@mui/icons-material';
import { AppBar, Box, Fab, Zoom, useScrollTrigger } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from 'components/Container';
import { MouseEvent, ReactElement, ReactNode, useState } from 'react';

import Modal from '../../components/atoms/Modal';
import { Sidebar, Topbar } from './components';
import { ContactForm } from './components/Topbar/components';

interface Props {
	children: ReactNode;
	colorInvert?: boolean;
	bgcolor?: string;
}

interface AppBarOnScrollProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	children: ReactElement<any, any>;
	window?: () => Window;
	isMobileView?: boolean;
}

interface ScrollTopProps {
	window?: () => Window;
	children: ReactElement;
}

const ScrollTop = ({ window, children }: ScrollTopProps) => {
	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
		disableHysteresis: true,
		threshold: 100,
	});

	const handleClick = (event: MouseEvent<HTMLDivElement>) => {
		const anchor = (
			(event.target as HTMLDivElement).ownerDocument || document
		).querySelector('#back-to-top-anchor');

		if (anchor) {
			anchor.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			});
		}
	};

	return (
		<Zoom in={trigger}>
			<Box
				onClick={handleClick}
				role="presentation"
				sx={{ position: 'fixed', bottom: 16, right: 16 }}
			>
				{children}
			</Box>
		</Zoom>
	);
};

const News = ({
	children,
	colorInvert = false,
	bgcolor = 'transparent',
}: Props): JSX.Element => {
	const theme = useTheme();
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	});
	const isSm = useMediaQuery(theme.breakpoints.down('sm'), {
		defaultMatches: true,
	});

	const [openSidebar, setOpenSidebar] = useState(false);
	const [openContactModal, setContactModalOpen] = useState<boolean>(false);

	const handleContactModal = () =>
		setContactModalOpen((prevState) => !prevState);

	const handleSidebarOpen = (): void => {
		setOpenSidebar(true);
	};

	const handleSidebarClose = (): void => {
		setOpenSidebar(false);
	};

	const open = isMd ? false : openSidebar;

	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
	});

	const renderContactModal = (): JSX.Element => (
		<Modal
			fullScreen={isSm}
			isModalOpen={openContactModal}
			renderHeader="Contact us"
			renderDialogText="Get in touch with us"
			renderContent={<ContactForm handleContactModal={handleContactModal} />}
			onClose={handleContactModal}
			onDismiss={handleContactModal}
		/>
	);

	return (
		<Box position={'relative'} minHeight={'100vh'}>
			<AppBar
				position={'sticky'}
				sx={{
					zIndex: (theme) => theme.zIndex.drawer + 1,
					top: 0,
					backgroundColor: trigger ? 'hsla(0,0%,100%,.8)' : bgcolor,
					backdropFilter: trigger ? 'blur(15px)' : 'none',
					borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
					// borderBottom: trigger
					// 	? `1px solid ${alpha(theme.palette.divider, 0.1)}`
					// 	: 'none',
				}}
				elevation={0}
			>
				<Container
					maxWidth={1}
					paddingY={{ xs: 2, md: 1 }}
					paddingX={{ xs: 1, md: 4 }}
				>
					<Topbar
						onSidebarOpen={handleSidebarOpen}
						handleContactModal={handleContactModal}
						colorInvert={trigger ? false : colorInvert}
					/>
				</Container>
			</AppBar>
			<div id="back-to-top-anchor" />
			<Sidebar
				onClose={handleSidebarClose}
				handleContactModal={handleContactModal}
				open={open}
				variant="temporary"
			/>
			{/*<Container*/}
			{/*	maxWidth={{ sm: 720, md: 960 }}*/}
			{/*	marginTop={-4}*/}
			{/*	paddingTop={'0 !important'}*/}
			{/*>*/}
			{/*<Box component="main" paddingX={isMd ? 3 : 0} paddingY={isMd ? 0 : 3}>*/}
			{/*	<Toolbar />*/}
			{/*	<Box*/}
			{/*		component={Grid}*/}
			{/*		container*/}
			{/*		spacing={4}*/}
			{/*		flexDirection={{ xs: 'column-reverse', md: 'row' }}*/}
			{/*	>*/}
			{/*		<Grid item xs={12} md={2}>*/}
			{/*			<Box*/}
			{/*				display={'flex'}*/}
			{/*				flexDirection={'column'}*/}
			{/*				justifyContent={'space-between'}*/}
			{/*				alignItems={'center'}*/}
			{/*				height={1}*/}

			{/*				// direction="column"*/}
			{/*				// justifyContent="space-between"*/}
			{/*				// alignItems="center"*/}
			{/*				// spacing={2}*/}
			{/*			>*/}
			{/*				<Box display="flex">*/}
			{/*					<Avatar>H</Avatar>*/}
			{/*				</Box>*/}
			{/*				<Box display="flex">*/}
			{/*					<Avatar>H</Avatar>*/}
			{/*				</Box>*/}
			{/*			</Box>*/}
			{/*		</Grid>*/}
			{/*		<Grid item xs={12} md={10}>*/}
			{/*			{children}*/}
			{/*		</Grid>*/}
			{/*	</Box>*/}
			{/*</Box>*/}
			<main>
				{/*<Container paddingTop={'0 !important'} marginTop={4}>*/}
				{/*	<Box*/}
				{/*		position={'relative'}*/}
				{/*		minHeight={'100vh'}*/}
				{/*		display={'flex'}*/}
				{/*		marginTop={-13}*/}
				{/*	>*/}
				{/*		<Box*/}
				{/*			flex={{ xs: '1 1 100%', md: '1 1 70%' }}*/}
				{/*			maxWidth={{ xs: '100%', md: '70%' }}*/}
				{/*		>*/}
				<Box height={1}>
					<Container
						maxWidth={{ sm: 720, md: 960 }}
						marginTop={-4}
						paddingTop={'0 !important'}
					>
						{children}
					</Container>
				</Box>
				{/*		</Box>*/}
				{/*	</Box>*/}
				{/*</Container>*/}
			</main>
			<ScrollTop>
				<Fab color="secondary" size="small" aria-label="scroll back to top">
					<KeyboardArrowUpRounded />
				</Fab>
			</ScrollTop>
			{/*</Container>*/}
		</Box>
	);
};

export default News;
