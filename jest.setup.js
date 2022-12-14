// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import 'jest-canvas-mock';
import fetchMock from 'jest-fetch-mock';

beforeEach(() => {
	fetchMock.resetMocks();
});

// afterEach(() => {
// 	const { cache } = useSWRConfig();
// 	cache.clear();
// });
