import { addons } from "storybook/internal/manager-api";
import { create } from "storybook/internal/theming/create";

// Brand the Storybook manager UI with the tutti-ui lockup (served from the
// repo's assets/ dir via staticDirs in main.ts).
addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "tutti-ui",
    brandUrl: "https://github.com/LaneGarner/tutti-ui",
    brandImage: "./assets/tuttiui-lockup.svg",
    brandTarget: "_self",
  }),
});
