import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";

const config: StorybookConfig = {
  stories: [
    "../src/**/*.stories.@(ts|tsx)",
    "../../../packages/react/src/**/*.stories.@(ts|tsx)",
    "../../../packages/react-native/src/**/*.stories.@(ts|tsx)",
  ],
  addons: ["@storybook/addon-essentials", "@storybook/addon-themes"],
  // Serve the repo's brand assets (logo lockup + marks) at /assets for the
  // manager theme (see manager.ts) and the favicon below.
  staticDirs: [{ from: "../../../assets", to: "/assets" }],
  managerHead: (head) =>
    `${head}<link rel="icon" type="image/svg+xml" href="./assets/tuttiui-mark-green.svg" />`,
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "react-native": require.resolve("react-native-web"),
      "react-native-reanimated": path.resolve(
        __dirname,
        "../src/shims/reanimated-web.tsx"
      ),
      "react-native-svg": path.resolve(
        __dirname,
        "../src/shims/svg-web.tsx"
      ),
    };
    config.resolve.extensions = [
      ".web.tsx",
      ".web.ts",
      ".web.js",
      ".tsx",
      ".ts",
      ".js",
    ];
    return config;
  },
};

export default config;
