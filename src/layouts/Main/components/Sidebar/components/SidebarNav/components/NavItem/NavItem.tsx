import { Link } from '@components/atoms';
import { UserContext } from '@context/UserContext';
import { sideLayoutNavigation } from '@layouts/navigation';
import { Mail } from '@mui/icons-material';
import { Avatar, Badge, Chip, Divider, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import fancyId from '@utils/fancyId';
import { useSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';

interface Props {
	title?: string;
	handleContactModal: () => void;
}

const NavItem = ({ handleContactModal }: Props): JSX.Element => {
	const theme = useTheme();
	const [activeLink, setActiveLink] = useState('');
	useEffect(() => {
		setActiveLink(window && window.location ? window.location.pathname : '');
	}, []);

	const { name, photo } = useContext(UserContext);

	const { data: session } = useSession();

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
			<Divider sx={{ marginBottom: 1, marginTop: 3 }} />
			{!!session && (
				<>
					<Stack
						direction="row"
						alignItems="center"
						justifyContent="space-between"
					>
						<Button
							component={Link}
							href={'/messages'}
							noLinkStyle
							sx={{
								paddingX: 0,
								fontWeight: 400,
								fontSize: 22,
								color: 'text.primary',
								textDecoration: 'none',
								'&:hover': {
									color: theme.palette.primary.dark,
								},
							}}
							variant="text"
							size="large"
						>
							Messages
						</Button>
						<Badge color="secondary" badgeContent={7}>
							<Mail />
						</Badge>
					</Stack>

					<Divider sx={{ marginBottom: 2, marginTop: 1 }} />
				</>
			)}

			{sideLayoutNavigation.map((page, i) => (
				<Box key={fancyId()} marginBottom={1} marginTop={3}>
					<Box display="block">
						<Box marginTop={5} key={fancyId()}>
							<Link href={page.href} noLinkStyle>
								<Typography
									color="primary"
									sx={{
										fontWeight: activeLink === page.href ? 600 : 400,
										fontSize: 22,
										cursor: 'pointer',
										color:
											activeLink === page.href
												? 'primary.main'
												: 'text.primary',
										textDecoration: 'none',
										'&:hover': {
											color: 'text.secondary',
										},
									}}
								>
									{page.title}
								</Typography>
							</Link>
						</Box>
					</Box>
				</Box>
			))}

			<Box marginBottom={4} marginTop={5}>
				<Typography
					onClick={handleContactModal}
					color="primary"
					sx={{
						fontWeight: 400,
						fontSize: 22,
						cursor: 'pointer',
						color: 'text.primary',
						textDecoration: 'none',
						'&:hover': {
							color: 'text.secondary',
						},
					}}
				>
					Contact Us
				</Typography>
			</Box>
		</Box>
	);
};

export default NavItem;
