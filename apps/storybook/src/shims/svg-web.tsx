import React, { forwardRef } from "react";

function createSvgComponent(Tag: string) {
  return forwardRef<any, any>((props, ref) => {
    const { children, ...rest } = props;
    return React.createElement(Tag, { ...rest, ref }, children);
  });
}

const Svg = createSvgComponent("svg");
export default Svg;

export const Circle = createSvgComponent("circle");
export const Path = createSvgComponent("path");
export const Rect = createSvgComponent("rect");
export const G = createSvgComponent("g");
export const Line = createSvgComponent("line");
export { Svg };
