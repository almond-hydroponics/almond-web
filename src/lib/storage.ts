import isBrowser from '@utils/isBrowser';

const storage = (key: string) => {
	const value = isBrowser ? localStorage.getItem(key) : '';
	if (!value) return undefined;

	return value;
};

export default storage;
