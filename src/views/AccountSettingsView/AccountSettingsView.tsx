import { MenuTab, MenuTabs, TabPanel } from '@components/atoms';
import Container from '@components/Container';
import { MenuComponentProps } from '@components/molecules/MenuRoutes/interfaces';
import { AllOut, NotificationsNone } from '@mui/icons-material';
import { Box, Card, Grid, Typography, useMediaQuery } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { ChangeEvent, createElement, useEffect, useState } from 'react';

import { Minimal } from '../../layouts';
import { Device, Notifications } from './components';

const subPages: MenuComponentProps[] = [
	// {
	// 	id: 'general',
	// 	primaryText: 'General',
	// 	component: General,
	// 	icon: <WidgetsRounded />,
	// },
	// {
	// 	id: 'security',
	// 	primaryText: 'Security',
	// 	component: Security,
	// 	icon: <SecurityOutlined />,
	// },
	{
		id: 'device',
		primaryText: 'Device',
		component: Device,
		icon: <AllOut />,
	},
	{
		id: 'notifications',
		primaryText: 'Notifications',
		component: Notifications,
		icon: <NotificationsNone />,
	},
];

const AccountSettingsView = (): JSX.Element => {
	const [selectedTabIndex, setSelectedTabIndex] = useState<number>(
		+JSON.parse(
			typeof window !== 'undefined'
				? (window.localStorage.getItem('selectedTabIndex') as string)
				: '0'
		)
	);

	useEffect(() => {
		window.localStorage.setItem(
			'selectedTabIndex',
			JSON.stringify(selectedTabIndex)
		);
	}, [selectedTabIndex]);

	const history = useRouter();

	const theme = useTheme();
	const isSm = useMediaQuery(theme.breakpoints.up('sm'), {
		defaultMatches: true,
	});

	const handleOnChange = (
		event: ChangeEvent<HTMLDivElement>,
		value: number
	) => {
		setSelectedTabIndex(value);
	};

	const a11yProps = (index: number | string) => {
		return {
			id: `menu-tab-${index}`,
			'aria-controls': `menu-tabpanel-${index}`,
		};
	};

	return (
		<Minimal>
			<Box sx={{ overflowX: 'hidden' }}>
				<Box bgcolor={'primary.main'} paddingY={4}>
					<Container>
						<Typography
							variant="h4"
							fontWeight={700}
							gutterBottom
							sx={{ color: 'common.white' }}
						>
							Account settings
						</Typography>
						<Typography variant="h6" sx={{ color: 'common.white' }}>
							Change account information and settings
						</Typography>
					</Container>
				</Box>

				<Container paddingTop={'0 !important'} marginTop={-8}>
					<Grid container spacing={4}>
						<Grid item xs={12} md={2}>
							<Card
								sx={{
									boxShadow: 0,
									borderRadius: 3,
									border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
								}}
							>
								<MenuTabs
									value={selectedTabIndex}
									// @ts-expect-error
									onChange={handleOnChange}
									orientation={isSm ? 'vertical' : 'horizontal'}
									scrollButtons={false}
									textColor="primary"
									aria-label="menu tabs"
								>
									{subPages.map((item) => (
										<MenuTab
											key={item.primaryText}
											label={item.primaryText}
											icon={item.icon}
											{...a11yProps(selectedTabIndex)}
										/>
									))}
								</MenuTabs>
							</Card>
						</Grid>
						<Grid item xs={12} md={10}>
							<Card
								sx={{
									boxShadow: 0,
									padding: 4,
									borderRadius: 3,
									border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
								}}
							>
								<TabPanel value={selectedTabIndex} index={selectedTabIndex}>
									{createElement(subPages[selectedTabIndex]?.component, {
										history,
									})}
								</TabPanel>
							</Card>
						</Grid>
					</Grid>
				</Container>
			</Box>
		</Minimal>
	);
};

export default AccountSettingsView;
