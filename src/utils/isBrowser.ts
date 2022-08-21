const isBrowser: boolean = ((): boolean => typeof window !== 'undefined')();

export default isBrowser;
