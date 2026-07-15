import { forwardRef, useEffect } from "react";
import { View, type ViewProps } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
  cancelAnimation,
} from "react-native-reanimated";

interface AnimatedPulseProps extends ViewProps {
  duration?: number;
}

export const AnimatedPulse = forwardRef<View, AnimatedPulseProps>(
  ({ duration = 1500, style, children, ...props }, ref) => {
    const opacity = useSharedValue(1);

    useEffect(() => {
      opacity.value = withRepeat(
        withSequence(
          withTiming(0.4, { duration: duration / 2, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: duration / 2, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      );
      return () => cancelAnimation(opacity);
    }, [opacity, duration]);

    const animatedStyle = useAnimatedStyle(() => ({
      opacity: opacity.value,
    }));

    return (
      <Animated.View ref={ref} style={[animatedStyle, style]} {...props}>
        {children}
      </Animated.View>
    );
  }
);

AnimatedPulse.displayName = "AnimatedPulse";
