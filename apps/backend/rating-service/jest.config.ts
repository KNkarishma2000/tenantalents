export default {
  displayName: 'rating-service',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/rating-service',
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
};
