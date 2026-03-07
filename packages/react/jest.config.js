/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@tutti-ui/tokens$": "<rootDir>/../tokens/src",
    "^@tutti-ui/shared$": "<rootDir>/../shared/src",
  },
};
