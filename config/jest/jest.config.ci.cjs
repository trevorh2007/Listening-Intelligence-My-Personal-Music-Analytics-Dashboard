const baseConfig = require('./jest.config.cjs');

module.exports = {
  ...baseConfig,
  bail: 1,
  ci: true,
  maxWorkers: 2,
  coverageReporters: ['text', 'lcov', 'json-summary'],
};
