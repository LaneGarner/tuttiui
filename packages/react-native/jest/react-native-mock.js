const React = require("react");

function createMockComponent(name) {
  const Component = React.forwardRef((props, ref) => {
    const { children, testID, accessibilityRole, accessibilityLabel, accessibilityState,
      accessibilityValue, accessibilityLiveRegion, style, className, ...rest } = props || {};

    const mappedProps = { ref };
    if (testID) mappedProps["data-testid"] = testID;
    if (accessibilityRole) mappedProps.role = accessibilityRole;
    if (accessibilityLabel) mappedProps["aria-label"] = accessibilityLabel;
    if (accessibilityState) {
      if (accessibilityState.disabled != null) mappedProps["aria-disabled"] = accessibilityState.disabled;
      if (accessibilityState.checked != null) mappedProps["aria-checked"] = accessibilityState.checked;
      if (accessibilityState.selected != null) mappedProps["aria-selected"] = accessibilityState.selected;
    }
    if (accessibilityValue) {
      if (accessibilityValue.now != null) mappedProps["aria-valuenow"] = accessibilityValue.now;
      if (accessibilityValue.min != null) mappedProps["aria-valuemin"] = accessibilityValue.min;
      if (accessibilityValue.max != null) mappedProps["aria-valuemax"] = accessibilityValue.max;
      if (accessibilityValue.text != null) mappedProps["aria-valuetext"] = accessibilityValue.text;
    }
    if (accessibilityLiveRegion) mappedProps["aria-live"] = accessibilityLiveRegion;
    // Pass style as a data attribute for tests that check style
    if (style) {
      const flatStyle = Array.isArray(style) ? Object.assign({}, ...style.filter(Boolean)) : style;
      mappedProps["data-style"] = JSON.stringify(flatStyle);
    }

    return React.createElement(name, mappedProps, children);
  });
  Component.displayName = name;
  return Component;
}

const View = createMockComponent("View");
const Text = createMockComponent("Text");

const TextInput = React.forwardRef((props, ref) => {
  const { testID, accessibilityRole, accessibilityLabel, accessibilityState,
    onChangeText, onSubmitEditing, onContentSizeChange, editable,
    placeholder, value, defaultValue, multiline, secureTextEntry, keyboardType,
    placeholderTextColor, onFocus, onBlur, className, style, ...rest } = props || {};

  const mappedProps = { ref };
  if (testID) mappedProps["data-testid"] = testID;
  if (accessibilityRole) mappedProps.role = accessibilityRole;
  if (accessibilityLabel) mappedProps["aria-label"] = accessibilityLabel;
  if (accessibilityState) {
    if (accessibilityState.disabled != null) mappedProps["aria-disabled"] = accessibilityState.disabled;
  }
  if (placeholder) mappedProps.placeholder = placeholder;
  if (value !== undefined) mappedProps.value = value;
  if (defaultValue !== undefined) mappedProps.defaultValue = defaultValue;
  if (editable === false) {
    mappedProps.disabled = true;
    mappedProps["data-editable"] = "false";
  }

  mappedProps.onChange = (e) => {
    if (onChangeText) onChangeText(e.target?.value || "");
  };
  if (onFocus) mappedProps.onFocus = onFocus;
  if (onBlur) mappedProps.onBlur = onBlur;

  // Use <input> for proper DOM value handling
  return React.createElement("input", mappedProps);
});
TextInput.displayName = "TextInput";

const Pressable = React.forwardRef((props, ref) => {
  const { children, testID, accessibilityRole, accessibilityLabel, accessibilityState,
    accessibilityValue, accessibilityHint, onPress, onLongPress, onPressOut, disabled, hitSlop, className, style, ...rest } = props || {};

  const mappedProps = { ref };
  if (testID) mappedProps["data-testid"] = testID;
  if (accessibilityRole) mappedProps.role = accessibilityRole;
  if (accessibilityLabel) mappedProps["aria-label"] = accessibilityLabel;
  if (accessibilityState) {
    if (accessibilityState.disabled != null) mappedProps["aria-disabled"] = accessibilityState.disabled;
    if (accessibilityState.checked != null) mappedProps["aria-checked"] = accessibilityState.checked;
    if (accessibilityState.selected != null) mappedProps["aria-selected"] = accessibilityState.selected;
  }
  if (accessibilityValue) {
    if (accessibilityValue.now != null) mappedProps["aria-valuenow"] = accessibilityValue.now;
    if (accessibilityValue.min != null) mappedProps["aria-valuemin"] = accessibilityValue.min;
    if (accessibilityValue.max != null) mappedProps["aria-valuemax"] = accessibilityValue.max;
    if (accessibilityValue.text != null) mappedProps["aria-valuetext"] = accessibilityValue.text;
  }
  if (disabled) {
    mappedProps.disabled = true;
    mappedProps["aria-disabled"] = true;
  }
  // Only attach onClick if not disabled
  if (onPress && !disabled) {
    mappedProps.onClick = onPress;
  }
  // Map long-press to contextmenu so fireEvent.longPress works in tests
  if (onLongPress && !disabled) {
    mappedProps.onContextMenu = onLongPress;
  }
  if (onPressOut && !disabled) {
    mappedProps.onMouseUp = onPressOut;
  }
  if (accessibilityHint) mappedProps["aria-description"] = accessibilityHint;

  const resolvedChildren = typeof children === "function"
    ? children({ pressed: false, hovered: false, focused: false })
    : children;

  return React.createElement("Pressable", mappedProps, resolvedChildren);
});
Pressable.displayName = "Pressable";

// Persistent scrollToEnd mock that survives re-renders
const _scrollToEndMock = jest.fn();
const ScrollView = React.forwardRef((props, ref) => {
  const { children, testID, className, style, ...rest } = props || {};
  React.useImperativeHandle(ref, () => ({
    scrollToEnd: _scrollToEndMock,
  }));
  return React.createElement("ScrollView", { "data-testid": testID }, children);
});
ScrollView.displayName = "ScrollView";
ScrollView._scrollToEndMock = _scrollToEndMock;

const Modal = React.forwardRef((props, ref) => {
  const { children, visible, transparent, animationType, onRequestClose, testID, className, style, ...rest } = props || {};
  if (visible === false) return null;
  return React.createElement("Modal", { "data-testid": testID, ref }, children);
});
Modal.displayName = "Modal";

const Image = React.forwardRef((props, ref) => {
  const { source, testID, accessibilityLabel, onLoad, onError, className, style, ...rest } = props || {};
  const mappedProps = { ref };
  if (testID) mappedProps["data-testid"] = testID;
  if (accessibilityLabel) mappedProps["aria-label"] = accessibilityLabel;
  if (source?.uri) mappedProps.src = source.uri;
  if (onLoad) mappedProps.onLoad = onLoad;
  if (onError) mappedProps.onError = onError;
  return React.createElement("Image", mappedProps);
});
Image.displayName = "Image";
Image.prefetch = jest.fn(() => Promise.resolve());

const Animated = {
  View: createMockComponent("Animated.View"),
  Text: createMockComponent("Animated.Text"),
  Image: createMockComponent("Animated.Image"),
  ScrollView: ScrollView,
  Value: jest.fn(() => ({
    setValue: jest.fn(),
    interpolate: jest.fn(() => ({ __getValue: jest.fn() })),
  })),
  timing: jest.fn(() => ({ start: jest.fn((cb) => cb && cb({ finished: true })) })),
  spring: jest.fn(() => ({ start: jest.fn((cb) => cb && cb({ finished: true })) })),
  parallel: jest.fn(() => ({ start: jest.fn((cb) => cb && cb({ finished: true })) })),
  sequence: jest.fn(() => ({ start: jest.fn((cb) => cb && cb({ finished: true })) })),
};

const AccessibilityInfo = {
  isReduceMotionEnabled: jest.fn(() => Promise.resolve(false)),
  addEventListener: jest.fn(() => ({ remove: jest.fn() })),
};

const StyleSheet = {
  create: (styles) => styles,
  flatten: (style) => {
    if (Array.isArray(style)) return Object.assign({}, ...style.filter(Boolean));
    return style || {};
  },
  absoluteFill: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
};

const Platform = { OS: "ios", select: (obj) => obj.ios || obj.default };
const Dimensions = { get: () => ({ width: 375, height: 812 }) };
const useColorScheme = jest.fn(() => "light");

module.exports = {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Modal,
  Image,
  Animated,
  AccessibilityInfo,
  StyleSheet,
  Platform,
  Dimensions,
  useColorScheme,
  TouchableOpacity: createMockComponent("TouchableOpacity"),
  TouchableHighlight: createMockComponent("TouchableHighlight"),
  ActivityIndicator: createMockComponent("ActivityIndicator"),
  FlatList: createMockComponent("FlatList"),
};
