import { useState, useEffect, useCallback, type FC } from "react";
import { Text, AccessibilityInfo, type TextProps } from "react-native";
import { cn } from "@tutti-ui/shared";
import { AnimatedPulse } from "../../primitives";

const SPEED_MAP = {
  slow: 80,
  normal: 40,
  fast: 15,
} as const;

export interface StreamingTextProps extends TextProps {
  text: string;
  isStreaming?: boolean;
  showCursor?: boolean;
  speed?: "slow" | "normal" | "fast";
  onComplete?: () => void;
}

function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    let mounted = true;

    AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      if (mounted) {
        setPrefersReducedMotion(enabled);
      }
    });

    const subscription = AccessibilityInfo.addEventListener(
      "reduceMotionChanged",
      (enabled) => {
        if (mounted) {
          setPrefersReducedMotion(enabled);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.remove();
    };
  }, []);

  return prefersReducedMotion;
}

export const StreamingText: FC<StreamingTextProps> = ({
  text,
  isStreaming,
  showCursor = true,
  speed = "normal",
  className,
  onComplete,
  ...props
}) => {
  const [displayedCount, setDisplayedCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const shouldAnimate = isStreaming && !prefersReducedMotion;

  const handleComplete = useCallback(() => {
    setIsComplete(true);
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    setDisplayedCount(0);
    setIsComplete(false);
  }, [text]);

  useEffect(() => {
    if (!shouldAnimate) {
      setDisplayedCount(text.length);
      if (isStreaming && !isComplete) {
        setIsComplete(true);
        onComplete?.();
      }
      return;
    }

    if (displayedCount >= text.length) {
      if (!isComplete) {
        handleComplete();
      }
      return;
    }

    const interval = setInterval(() => {
      setDisplayedCount((prev) => {
        const next = prev + 1;
        if (next >= text.length) {
          clearInterval(interval);
        }
        return next;
      });
    }, SPEED_MAP[speed]);

    return () => clearInterval(interval);
  }, [shouldAnimate, text, speed, displayedCount, isComplete, isStreaming, onComplete, handleComplete]);

  const displayedText = shouldAnimate ? text.slice(0, displayedCount) : text;
  const showBlinkingCursor = showCursor && isStreaming && !isComplete;

  return (
    <Text
      className={cn(className)}
      testID="streaming-text"
      accessibilityRole="text"
      accessibilityLiveRegion="polite"
      {...props}
    >
      {displayedText}
      {showBlinkingCursor && (
        <AnimatedPulse duration={1000}>
          <Text className="text-tt-info" testID="streaming-cursor">
            |
          </Text>
        </AnimatedPulse>
      )}
    </Text>
  );
};

StreamingText.displayName = "StreamingText";
