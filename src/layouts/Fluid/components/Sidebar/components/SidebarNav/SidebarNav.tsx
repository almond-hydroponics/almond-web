import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import pages from '../../../../../navigation';
import NavItem from './components/NavItem';

interface Props {
	// eslint-disable-next-line @typescript-eslint/ban-types
	onClose: () => void;
}

const SidebarNav = ({ onClose }: Props): JSX.Element => {
	return (
		<Box>
			<Box
				display={'flex'}
				justifyContent={'flex-end'}
				onClick={() => onClose()}
			>
				<IconButton>
					<CloseIcon fontSize="small" />
				</IconButton>
			</Box>
			<Box paddingX={2} paddingBottom={2}>
				<Box>
					<NavItem title={'Landings'} items={pages} />
				</Box>
				<Divider sx={{ marginBottom: 2 }} />
				<Box marginTop={1}>
					<Button
						variant="outlined"
						fullWidth
						component="a"
						href="/docs/introduction"
					>
						Documentation
					</Button>
				</Box>
				<Box marginTop={1}>
					<Button
						variant="contained"
						color="primary"
						fullWidth
						component="a"
						target="blank"
						href="https://material-ui.com/store/items/the-front-landing-page/"
					>
						Purchase now
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default SidebarNav;
