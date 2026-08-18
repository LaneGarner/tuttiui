import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
  type Ref,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@tuttiui/shared";

export interface TabBarProps extends HTMLAttributes<HTMLElement> {
  safeArea?: boolean;
  "aria-label"?: string;
}

export const TabBar = forwardRef<HTMLElement, TabBarProps>(
  (
    {
      className,
      safeArea = false,
      "aria-label": ariaLabel = "Main",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 flex items-stretch border-t border-tt-border bg-tt-surface",
          safeArea && "pb-[env(safe-area-inset-bottom)]",
          className
        )}
        {...props}
      >
        {children}
      </nav>
    );
  }
);

TabBar.displayName = "TabBar";

const tabBarItemVariants = cva(
  "flex min-h-11 flex-1 flex-col items-center justify-center gap-0.5 px-2 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-tt-focus",
  {
    variants: {
      active: {
        true: "text-tt-primary",
        false: "text-tt-fg-muted hover:text-tt-fg",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

export interface TabBarItemProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof tabBarItemVariants> {
  icon?: ReactNode;
  label: string;
  active?: boolean;
  href?: string;
}

export const TabBarItem = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  TabBarItemProps
>(({ className, icon, label, active = false, href, type, ...props }, ref) => {
  const sharedProps = {
    "aria-current": active ? ("page" as const) : undefined,
    "data-active": active ? "true" : "false",
    className: cn(tabBarItemVariants({ active }), className),
  };

  const content = (
    <>
      {icon && (
        <span
          aria-hidden="true"
          className="flex h-6 items-center justify-center [&>svg]:h-5 [&>svg]:w-5"
        >
          {icon}
        </span>
      )}
      <span>{label}</span>
    </>
  );

  if (href !== undefined) {
    return (
      <a
        ref={ref as Ref<HTMLAnchorElement>}
        href={href}
        {...sharedProps}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref as Ref<HTMLButtonElement>}
      type={type ?? "button"}
      {...sharedProps}
      {...props}
    >
      {content}
    </button>
  );
});

TabBarItem.displayName = "TabBarItem";

export { tabBarItemVariants };
