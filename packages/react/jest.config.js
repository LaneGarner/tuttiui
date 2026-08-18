/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@tuttiui/tokens$": "<rootDir>/../tokens/src",
    "^@tuttiui/shared$": "<rootDir>/../shared/src",
  },
};
