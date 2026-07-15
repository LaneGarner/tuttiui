/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react-jsx",
          types: ["react-native", "@types/jest"],
        },
      },
    ],
  },
  moduleNameMapper: {
    "^@tutti-ui/tokens$": "<rootDir>/../tokens/src",
    "^@tutti-ui/shared/native$": "<rootDir>/../shared/src/native",
    "^@tutti-ui/shared$": "<rootDir>/../shared/src",
    "^react-native$": "<rootDir>/jest/react-native-mock.js",
    "^react-native/(.*)$": "<rootDir>/jest/react-native-mock.js",
    "^react-native-reanimated$": "<rootDir>/jest/reanimated-mock.js",
    "^react-native-svg$": "<rootDir>/jest/svg-mock.js",
    "^@testing-library/react-native$": "<rootDir>/jest/testing-library-shim.js",
  },
};
