const React = require("react");

function createMockComponent(name) {
  const Component = React.forwardRef((props, ref) => {
    const { children, ...rest } = props || {};
    return React.createElement(name, { ...rest, ref }, children);
  });
  Component.displayName = name;
  return Component;
}

module.exports = {
  __esModule: true,
  default: createMockComponent("Svg"),
  Svg: createMockComponent("Svg"),
  Circle: createMockComponent("Circle"),
  Path: createMockComponent("Path"),
  Rect: createMockComponent("Rect"),
  G: createMockComponent("G"),
  Line: createMockComponent("Line"),
};
