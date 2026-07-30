import type { Preview } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";
import "../src/styles.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // The backgrounds picker used to be the only "dark mode" here, and it only
    // ever changed the canvas behind the components. That illusion is what let
    // a library with zero dark styles look fine in Storybook for two releases.
    // The theme toggle below puts `.dark` on <html>, which is what actually
    // drives the color variables, and paints the canvas from `--tt-canvas`.
    backgrounds: { disable: true },
  },
  decorators: [
    withThemeByClassName({
      themes: { light: "", dark: "dark" },
      defaultTheme: "light",
    }),
  ],
};

export default preview;
