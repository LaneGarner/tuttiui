import { useState, useEffect, useCallback, type FC } from "react";
import { cn } from "@tutti-ui/shared";

const SPEED_MAP = {
  slow: 80,
  normal: 40,
  fast: 15,
} as const;

export interface StreamingTextProps {
  text: string;
  isStreaming?: boolean;
  showCursor?: boolean;
  speed?: "slow" | "normal" | "fast";
  className?: string;
  onComplete?: () => void;
}

function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
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
    <span className={cn(className)} data-testid="streaming-text">
      {displayedText}
      {showBlinkingCursor && (
        <span className="inline-block animate-pulse text-tt-info" data-testid="streaming-cursor">
          |
        </span>
      )}
    </span>
  );
};

StreamingText.displayName = "StreamingText";
