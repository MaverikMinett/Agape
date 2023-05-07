/* eslint-disable */
export default {
  displayName: 'agape-ng-tie-subscriptions',
  preset: '../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../coverage/libs/agape/ng-tie-subscriptions',
};
