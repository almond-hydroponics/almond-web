import { TabPanel } from '@/components/atoms';
import Container from '@/components/Container';
import { AdminMenus } from '@/components/molecules/MenuRoutes';
import { ComponentContext } from '@/context/ComponentContext';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { createElement, useContext, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import Dashboard from '../../layouts/Dashboard';

const AdminView = (): JSX.Element => {
	const history = useRouter();
	const dispatch = useDispatch();
	const mounted = useRef(false);

	const theme = useTheme();

	useEffect(() => {
		mounted.current = true;

		return () => {
			mounted.current = false;
		};
	}, []);

	const { selectedIndex } = useContext(ComponentContext);

	return (
		<Box
			sx={{ overflowX: 'hidden', background: theme.palette.alternate.main }}
		>
			<Dashboard>
				<Container
					sx={{ position: 'relative' }}
					maxWidth={{
						sm: 720,
						md: '100%',
					}} // Replace md with 1440px if it doesn't work
					width={1}
					paddingY={1}
					paddingX={{ xs: 1 }}
				>
					<TabPanel index={selectedIndex} value={selectedIndex}>
						{createElement(AdminMenus[selectedIndex].component, {
							history,
						})}
					</TabPanel>
				</Container>
			</Dashboard>
		</Box>
	);
};

export default AdminView;
