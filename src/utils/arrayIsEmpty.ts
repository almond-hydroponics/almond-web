/**
 * Checks if an array is empty
 * @returns {boolean}
 */
const arrayIsEmpty = (array: number | string[] | object[]): boolean =>
	Array.isArray(array) && Object.keys(array).length === 0;

export default arrayIsEmpty;
