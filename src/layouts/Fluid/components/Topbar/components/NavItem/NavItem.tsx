import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Popover from '@mui/material/Popover';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

interface Props {
	title: string;
	id: string;
	items: Array<PageItem>;
}

const NavItem = ({ title, id, items }: Props): JSX.Element => {
	const theme = useTheme();

	const [anchorEl, setAnchorEl] = useState(null);
	const [openedPopoverId, setOpenedPopoverId] = useState(null);

	const handleClick = (event: any, popoverId: any) => {
		setAnchorEl(event.target);
		setOpenedPopoverId(popoverId);
	};

	const handleClose = (): void => {
		setAnchorEl(null);
		setOpenedPopoverId(null);
	};

	const [activeLink, setActiveLink] = useState('');
	useEffect(() => {
		setActiveLink(window && window.location ? window.location.pathname : '');
	}, []);

	return (
		<Box>
			<Box
				display={'flex'}
				alignItems={'center'}
				aria-describedby={id}
				sx={{ cursor: 'pointer' }}
				onClick={(e) => handleClick(e, id)}
			>
				<Typography
					color={openedPopoverId === id ? 'primary' : 'text.primary'}
				>
					{title}
				</Typography>
				<ExpandMoreIcon
					sx={{
						marginLeft: theme.spacing(1),
						transform: openedPopoverId === id ? 'rotate(180deg)' : 'none',
						color:
							openedPopoverId === id
								? theme.palette.primary.dark
								: theme.palette.text.primary,
					}}
					fontSize="small"
				/>
			</Box>
			<Popover
				elevation={3}
				id={id}
				open={openedPopoverId === id}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				sx={{
					'.MuiPaper-root': {
						maxWidth: 600,
						padding: 4,
						marginTop: 2,
						borderRadius: 2,
					},
				}}
			>
				<Grid container spacing={2}>
					{items.map((item, i) => (
						<Grid item key={i} xs={6}>
							<Typography
								variant="caption"
								color="primary"
								sx={{
									fontWeight: 700,
									textTransform: 'uppercase',
									display: 'block',
								}}
							>
								{item.groupTitle}
							</Typography>
							<Grid container>
								{item.pages.map((p, i) => (
									<Grid item xs={6} key={i}>
										<Link
											variant="body2"
											component={'a'}
											href={p.href}
											color={
												activeLink === p.href ? 'primary' : 'text.primary'
											}
											sx={{
												fontWeight: activeLink === p.href ? 600 : 400,
												'&:hover': {
													textDecoration: 'none',
													color: theme.palette.primary.dark,
												},
												textDecoration: 'none',
											}}
										>
											{p.title}
										</Link>
									</Grid>
								))}
							</Grid>
						</Grid>
					))}
				</Grid>
			</Popover>
		</Box>
	);
};

export default NavItem;
