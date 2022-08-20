import {
	AdminBottomNavigationMenus,
	BottomNavigationMenus,
} from '@components/molecules/MenuRoutes';
// components
import { ComponentContext } from '@context/ComponentContext';
import { UserContext } from '@context/UserContext';
// third party
import {
	BottomNavigation,
	BottomNavigationAction,
	Box,
	CssBaseline,
	Paper,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { useContext } from 'react';

const PageBottomNavigation = (): JSX.Element => {
	const { selectedIndex, setSelectedIndex, currentRoleBasedAccess } =
		useContext(ComponentContext);
	const { isAdmin } = useContext(UserContext);
	const theme = useTheme();

	const displayNavigationByRoleBase = {
		USER: BottomNavigationMenus,
		ADMIN: AdminBottomNavigationMenus,
		DEVELOPER: BottomNavigationMenus,
	};

	const handleChange = (event, newValue) => setSelectedIndex(newValue);

	return (
		<Box sx={{ pb: 7 }}>
			<CssBaseline />
			<Paper
				sx={{
					position: 'fixed',
					bottom: 0,
					left: 0,
					right: 0,
					backgroundColor: 'alternate.main',
					borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
				}}
				elevation={0}
				data-testid="bottom-navigation"
			>
				<BottomNavigation
					value={selectedIndex}
					onChange={handleChange}
					showLabels
				>
					{displayNavigationByRoleBase[currentRoleBasedAccess].map(
						(menuNav, index) => (
							<BottomNavigationAction
								// sx={{ fontSize: 10 }}
								key={menuNav.label}
								label={menuNav.label}
								icon={menuNav.icon}
								value={index}
							/>
						)
					)}
				</BottomNavigation>
			</Paper>
		</Box>
	);
};

export default PageBottomNavigation;
