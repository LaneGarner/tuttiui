import { forwardRef, useEffect } from "react";
import { View, type ViewProps } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  cancelAnimation,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

const SIZES = { sm: 16, md: 24, lg: 32 } as const;
type SpinnerSize = keyof typeof SIZES;

interface AnimatedSpinnerProps extends ViewProps {
  size?: SpinnerSize;
  color?: string;
}

export const AnimatedSpinner = forwardRef<View, AnimatedSpinnerProps>(
  ({ size = "md", color = "#6366f1", style, ...props }, ref) => {
    const rotation = useSharedValue(0);
    const dimension = SIZES[size];
    const strokeWidth = size === "sm" ? 2 : 3;
    const radius = (dimension - strokeWidth) / 2;

    useEffect(() => {
      rotation.value = withRepeat(
        withTiming(360, { duration: 1000, easing: Easing.linear }),
        -1,
        false
      );
      return () => cancelAnimation(rotation);
    }, [rotation]);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ rotate: `${rotation.value}deg` }],
    }));

    return (
      <Animated.View
        ref={ref}
        style={[{ width: dimension, height: dimension }, animatedStyle, style]}
        {...props}
      >
        <Svg width={dimension} height={dimension} viewBox={`0 0 ${dimension} ${dimension}`}>
          <Circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${radius * Math.PI * 1.5} ${radius * Math.PI * 2}`}
            strokeLinecap="round"
            fill="none"
            opacity={0.75}
          />
          <Circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            opacity={0.2}
          />
        </Svg>
      </Animated.View>
    );
  }
);

AnimatedSpinner.displayName = "AnimatedSpinner";
