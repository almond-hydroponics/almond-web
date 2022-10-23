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
import { useRouter } from 'next/router';
import { useContext } from 'react';

const PageBottomNavigation = (): JSX.Element => {
	const { selectedIndex, setSelectedIndex, currentRoleBasedAccess } =
		useContext(ComponentContext);
	const { pathname } = useRouter();

	const { isAdmin } = useContext(UserContext);
	const theme = useTheme();

	const switchUserNavigation = (pathname: string) => {
		switch (pathname) {
			case '/dashboard':
				return BottomNavigationMenus;
			case '/admin':
				return AdminBottomNavigationMenus;
			case '/developer':
				return AdminBottomNavigationMenus;
			default:
				return BottomNavigationMenus;
		}
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
					{switchUserNavigation(pathname).map((menuNav, index) => (
						<BottomNavigationAction
							// sx={{ fontSize: 10 }}
							key={menuNav.label}
							label={menuNav.label}
							icon={menuNav.icon}
							value={index}
						/>
					))}
				</BottomNavigation>
			</Paper>
		</Box>
	);
};

export default PageBottomNavigation;

// -webkit-border-radius: 22px;
// border-radius: 22px;
// height: 30px;
// margin-bottom: 2px;
// margin-left: 12px;
// position: relative;
// width: 44px;
//
// -webkit-font-smoothing: antialiased;
// font-family: "Google Sans",Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
// font-size: .875rem;
// letter-spacing: normal;
// -webkit-border-radius: 0;
// border-radius: 0;
// color: #202124;
// display: -webkit-box;
// display: -webkit-flex;
// display: flex;
// font-weight: 500;
// height: 40px;
// padding-left: 0;
// padding-right: 16px;
// text-shadow: none;
