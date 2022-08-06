import { useEffect, useState } from 'react';
import { PaletteMode } from '@mui/material';

const useDarkMode = (): [PaletteMode, () => void, boolean] => {
	const [themeMode, setTheme] = useState<PaletteMode>('light');
	const [mountedComponent, setMountedComponent] = useState(false);

	const setMode = (mode: PaletteMode) => {
		try {
			window.localStorage.setItem('themeMode', mode);
		} catch {
			/* do nothing */
		}

		setTheme(mode);
	};

	const themeToggler = (): void => {
		themeMode === 'light' ? setMode('dark') : setMode('light');
	};

	useEffect(() => {
		try {
			const localTheme = window.localStorage.getItem(
				'themeMode'
			) as PaletteMode;
			localTheme ? setTheme(localTheme) : setMode('light');
		} catch {
			setMode('light');
		}

		setMountedComponent(true);
	}, []);

	return [themeMode, themeToggler, mountedComponent];
};

export default useDarkMode;
