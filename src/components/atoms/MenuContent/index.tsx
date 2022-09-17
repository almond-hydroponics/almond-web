import { MenuTab, MenuTabs } from '@components/atoms';
// components
import { AdminMenus, UserMenus } from '@components/molecules/MenuRoutes';
import { ComponentContext } from '@context/ComponentContext';
import { useRouter } from 'next/router';
import { ChangeEvent, useContext } from 'react';

const MenuContent = (): JSX.Element => {
	const { selectedIndex, setSelectedIndex } = useContext(ComponentContext);

	const { pathname } = useRouter();

	const switchUserMenus = (pathname: string) => {
		switch (pathname) {
			case '/dashboard':
				return UserMenus;
			case '/admin':
				return AdminMenus;
			case '/developer':
				return AdminMenus;
			default:
				return UserMenus;
		}
	};

	const handleOnChange = (
		event: ChangeEvent<HTMLDivElement>,
		value: number
	) => {
		setSelectedIndex(value);
	};

	const a11yProps = (index: number | string) => {
		return {
			id: `menu-tab-${index}`,
			'aria-controls': `menu-tabpanel-${index}`,
		};
	};

	return (
		<MenuTabs
			style={{ padding: 0, margin: 0 }}
			value={selectedIndex}
			// @ts-expect-error
			onChange={handleOnChange}
			orientation="vertical"
			scrollButtons={false}
			textColor="primary"
			aria-label="menu tabs"
			visibleScrollbar={false}
		>
			{switchUserMenus(pathname).map((item) => (
				<MenuTab
					key={item.primaryText}
					label={item.primaryText}
					icon={item.icon}
					{...a11yProps(selectedIndex)}
				/>
			))}
		</MenuTabs>
	);
};

export default MenuContent;
