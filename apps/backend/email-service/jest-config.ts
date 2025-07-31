export default {
  displayName: 'email-service',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],
  coverageDirectory: '../../coverage/apps/email-service',
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
