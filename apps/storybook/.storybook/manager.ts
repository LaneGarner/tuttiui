import { addons } from "storybook/internal/manager-api";
import { create } from "storybook/internal/theming/create";

// Brand the Storybook manager UI with the tuttiui lockup (served from the
// repo's assets/ dir via staticDirs in main.ts).
addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "tuttiui",
    brandUrl: "https://github.com/LaneGarner/tuttiui",
    brandImage: "./assets/tuttiui-lockup.svg",
    brandTarget: "_self",
  }),
});
