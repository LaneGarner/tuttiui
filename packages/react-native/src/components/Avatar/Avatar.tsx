import {
  createContext,
  forwardRef,
  useContext,
  useState,
  useEffect,
} from "react";
import {
  View,
  Image,
  Text,
  type ViewProps,
  type ImageProps,
  type TextProps,
} from "react-native";
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
  extends ViewProps,
    VariantProps<typeof avatarVariants> {}

export const Avatar = forwardRef<View, AvatarProps>(
  ({ className, size = "md", children, ...props }, ref) => {
    return (
      <AvatarContext.Provider value={size ?? "md"}>
        <View
          ref={ref}
          className={cn(avatarVariants({ size }), className)}
          {...props}
        >
          {children}
        </View>
      </AvatarContext.Provider>
    );
  }
);

Avatar.displayName = "Avatar";

type ImageLoadingStatus = "idle" | "loading" | "loaded" | "error";

export interface AvatarImageProps extends Omit<ImageProps, "source"> {
  src?: string;
  alt?: string;
  onLoadingStatusChange?: (status: ImageLoadingStatus) => void;
}

export const AvatarImage = forwardRef<Image, AvatarImageProps>(
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

      Image.prefetch(src)
        .then(() => {
          setStatus("loaded");
          onLoadingStatusChange?.("loaded");
        })
        .catch(() => {
          setStatus("error");
          onLoadingStatusChange?.("error");
        });
    }, [src, onLoadingStatusChange]);

    if (status !== "loaded") {
      return null;
    }

    return (
      <Image
        ref={ref}
        source={{ uri: src }}
        accessibilityLabel={alt}
        className={cn("h-full w-full", className)}
        resizeMode="cover"
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

export interface AvatarFallbackProps extends ViewProps {}

export const AvatarFallback = forwardRef<View, AvatarFallbackProps>(
  ({ className, children, ...props }, ref) => {
    const size = useAvatarSize();

    return (
      <View
        ref={ref}
        className={cn(
          "flex h-full w-full items-center justify-center rounded-full bg-gray-100",
          className
        )}
        {...props}
      >
        {typeof children === "string" ? (
          <Text
            className={cn(
              "text-gray-600 font-medium",
              fallbackTextVariants[size]
            )}
          >
            {children}
          </Text>
        ) : (
          children
        )}
      </View>
    );
  }
);

AvatarFallback.displayName = "AvatarFallback";

export { avatarVariants };
