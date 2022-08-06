const nextJest = require('next/jest');

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
	verbose: true,
	roots: ['<rootDir>/src'],
	globals: {
		'ts-jest': {
			tsconfig: '<rootDir>/tsconfig.json',
		},
	},
	moduleDirectories: ['node_modules', '<rootDir>/'],
	coverageReporters: ['html', 'json', 'lcov', 'text', 'clover'],
	collectCoverage: true,
	collectCoverageFrom: ['**/*.{ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
	testEnvironment: 'jest-environment-jsdom',
	coverageThreshold: {
		global: {
			branches: 1,
			functions: 1,
			lines: 2,
			statements: 2,
		},
	},
	moduleNameMapper: {
		// Handle CSS imports (with CSS modules)
		// https://jestjs.io/docs/webpack#mocking-css-modules
		'^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

		// Handle CSS imports (without CSS modules)
		'^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

		// Handle image imports
		// https://jestjs.io/docs/webpack#handling-static-assets
		'^.+\\.(jpg|jpeg|png|gif|webp|svg)$': `<rootDir>/__mocks__/fileMock.js`,

		// Handle module aliases
		// '^@/components/(.*)$': '<rootDir>/components/$1',
		'@utils/(.*)$': '<rootDir>/src/utils/$1',
		'@modules/(.*)$': '<rootDir>/src/store/modules/$1',
		'@components/(.*)$': '<rootDir>src/components/$1',
		'@pages/(.*)$': '<rootDir>src/pages/$1',
		'@context/(.*)$': '<rootDir>src/context/$1',
		'@hooks/(.*)$': '<rootDir>src/hooks/$1',
		'@view/(.*)$': '<rootDir>src/view/$1',
		'@lib/(.*)$': '<rootDir>src/lib/$1',
		'@svg/(.*)$': '<rootDir>src/svg/$1',
		'@views/(.*)$': '<rootDir>src/views/$1',
	},
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	testPathIgnorePatterns: [
		'<rootDir>/node_modules/',
		'<rootDir>/.next/',
		'<rootDir>/.yarn',
		'<rootDir>/src/testUtils.tsx',
	],
	resolver: '<rootDir>/.jest/resolver.js',
	transformIgnorePatterns: [
		'[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
		'^.+\\.module\\.(css|sass|scss)$',
		'node_modules/(?!(@mui)/)',
		'/.pnp.js$',
		'^.+\\.module\\.(css|sass|scss)$',
	],
};

module.exports = createJestConfig(customJestConfig);
