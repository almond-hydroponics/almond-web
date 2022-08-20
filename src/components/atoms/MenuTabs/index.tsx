import { Tab, Tabs } from '@mui/material';
import { styled } from '@mui/material/styles';

interface MenuTabProps {
	label?: string;
	icon?: any;
}

const MenuTabs = styled(Tabs)({
	'& .MuiTabs-indicator': {
		display: 'none',
	},
});

const MenuTab = styled((props: MenuTabProps) => (
	<Tab disableRipple {...props} />
))(({ theme }) => ({
	paddingBottom: 28,
	paddingTop: 28,
	textTransform: 'none',
	minWidth: 72,
	'&:hover': {
		color: theme.palette.text.primary,
		backgroundColor: theme.palette.alternate.main,
	},
	'&.Mui-selected': {
		color: theme.palette.primary.main,
		fontWeight: theme.typography.fontWeightMedium,
		border: 'none',
		// backgroundColor: alpha(theme.palette.primary.main, 0.1),
		// borderRadius: theme.shape.borderRadius,
	},
	'&:focus': {
		color: theme.palette.primary.main,
	},
}));

export { MenuTabs, MenuTab };
