export default {
  displayName: 'invoice-service',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/invoice-service',
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
};
