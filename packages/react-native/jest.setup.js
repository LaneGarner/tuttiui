// Mock react-native-reanimated
jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock react-native-svg
jest.mock("react-native-svg", () => {
  const React = require("react");
  const mockComponent = (name) => {
    const MockSvg = React.forwardRef((props, ref) =>
      React.createElement(name, { ...props, ref })
    );
    MockSvg.displayName = name;
    return MockSvg;
  };
  return {
    __esModule: true,
    default: mockComponent("Svg"),
    Svg: mockComponent("Svg"),
    Circle: mockComponent("Circle"),
    Path: mockComponent("Path"),
    Rect: mockComponent("Rect"),
    G: mockComponent("G"),
    Line: mockComponent("Line"),
  };
});
