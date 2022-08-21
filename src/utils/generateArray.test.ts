import generateArray from '@utils/generateArray';

const array = () => [{ id: '1' }];

describe('The generateArray helper function', () => {
	it('should return a new array with values', () => {
		expect(generateArray(1, array)).toEqual([[{ id: '1' }]]);
	});
});
