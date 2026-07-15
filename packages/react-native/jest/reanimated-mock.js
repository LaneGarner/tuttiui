const React = require("react");

function createMockComponent(name) {
  const Component = React.forwardRef((props, ref) => {
    const { children, style, ...rest } = props || {};
    return React.createElement(name, { ...rest, ref, style }, children);
  });
  Component.displayName = name;
  return Component;
}

const Animated = {
  View: createMockComponent("Animated.View"),
  Text: createMockComponent("Animated.Text"),
  Image: createMockComponent("Animated.Image"),
  ScrollView: createMockComponent("Animated.ScrollView"),
};

module.exports = {
  __esModule: true,
  default: Animated,
  ...Animated,
  useSharedValue: jest.fn((init) => ({ value: init })),
  useAnimatedStyle: jest.fn((fn) => fn()),
  withRepeat: jest.fn((anim) => anim),
  withTiming: jest.fn((toValue) => toValue),
  withSequence: jest.fn((...args) => args[0]),
  withSpring: jest.fn((toValue) => toValue),
  Easing: {
    linear: jest.fn(),
    ease: jest.fn(),
    inOut: jest.fn(() => jest.fn()),
  },
  cancelAnimation: jest.fn(),
  runOnJS: jest.fn((fn) => fn),
};
