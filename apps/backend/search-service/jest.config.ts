export default {
  displayName: 'search-service',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/search-service',
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
};
