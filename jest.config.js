const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@/core/(.*)$': '<rootDir>/src/core/$1',
    '^@/utilities/(.*)$': '<rootDir>/src/utilities/$1',
    '^@/generated/(.*)$': '<rootDir>/src/generated/$1',
    '^@/styles/(.*)$': '<rootDir>/src/styles/$1',
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
