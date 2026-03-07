import {
  createContext,
  forwardRef,
  useContext,
  useState,
  useEffect,
  type HTMLAttributes,
  type ImgHTMLAttributes,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@tutti-ui/shared";

type AvatarSize = "sm" | "md" | "lg" | "xl";

const AvatarContext = createContext<AvatarSize>("md");

const useAvatarSize = () => useContext(AvatarContext);

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
        xl: "h-16 w-16",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface AvatarProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarVariants> {}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, size = "md", children, ...props }, ref) => {
    return (
      <AvatarContext.Provider value={size ?? "md"}>
        <span
          ref={ref}
          className={cn(avatarVariants({ size }), className)}
          {...props}
        >
          {children}
        </span>
      </AvatarContext.Provider>
    );
  }
);

Avatar.displayName = "Avatar";

type ImageLoadingStatus = "idle" | "loading" | "loaded" | "error";

export interface AvatarImageProps
  extends ImgHTMLAttributes<HTMLImageElement> {
  onLoadingStatusChange?: (status: ImageLoadingStatus) => void;
}

export const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, src, alt, onLoadingStatusChange, ...props }, ref) => {
    const [status, setStatus] = useState<ImageLoadingStatus>("idle");

    useEffect(() => {
      if (!src) {
        setStatus("error");
        onLoadingStatusChange?.("error");
        return;
      }

      setStatus("loading");
      onLoadingStatusChange?.("loading");

      const image = new window.Image();
      image.src = src;

      image.onload = () => {
        setStatus("loaded");
        onLoadingStatusChange?.("loaded");
      };

      image.onerror = () => {
        setStatus("error");
        onLoadingStatusChange?.("error");
      };

      return () => {
        image.onload = null;
        image.onerror = null;
      };
    }, [src, onLoadingStatusChange]);

    if (status !== "loaded") {
      return null;
    }

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={cn("aspect-square h-full w-full object-cover", className)}
        {...props}
      />
    );
  }
);

AvatarImage.displayName = "AvatarImage";

const fallbackTextVariants: Record<AvatarSize, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

export interface AvatarFallbackProps extends HTMLAttributes<HTMLSpanElement> {}

export const AvatarFallback = forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  ({ className, children, ...props }, ref) => {
    const size = useAvatarSize();

    return (
      <span
        ref={ref}
        className={cn(
          "flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-gray-600 font-medium",
          fallbackTextVariants[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

AvatarFallback.displayName = "AvatarFallback";

export { avatarVariants };
