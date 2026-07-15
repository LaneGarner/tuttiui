import React, { forwardRef, useRef, useCallback } from "react";

function createAnimatedComponent(Component: any) {
  return forwardRef((props: any, ref: any) => (
    <Component {...props} ref={ref} />
  ));
}

const View = forwardRef<HTMLDivElement, any>(({ style, ...props }, ref) => (
  <div {...props} ref={ref} style={style} />
));
const Text = forwardRef<HTMLSpanElement, any>(({ style, ...props }, ref) => (
  <span {...props} ref={ref} style={style} />
));
const Image = forwardRef<HTMLImageElement, any>(({ style, ...props }, ref) => (
  <img {...props} ref={ref} style={style} />
));

const Animated = { View, Text, Image };

export default Animated;
export { View, Text, Image };

export function useSharedValue(init: number) {
  const ref = useRef({ value: init });
  return ref.current;
}

export function useAnimatedStyle(updater: () => any) {
  return updater();
}

export function withRepeat(animation: any) {
  return animation;
}

export function withTiming(toValue: number, config?: any) {
  return toValue;
}

export function withSequence(...args: any[]) {
  return args[0];
}

export function withSpring(toValue: number) {
  return toValue;
}

export const Easing = {
  linear: (x: number) => x,
  ease: (x: number) => x,
  inOut: (fn: any) => fn,
};

export function cancelAnimation() {}

export function runOnJS(fn: any) {
  return fn;
}
