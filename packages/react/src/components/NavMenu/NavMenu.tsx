import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@tutti-ui/shared";

export interface NavMenuProps extends HTMLAttributes<HTMLElement> {
  orientation?: "horizontal" | "vertical";
  "aria-label"?: string;
}

export const NavMenu = forwardRef<HTMLElement, NavMenuProps>(
  ({ className, orientation = "vertical", children, ...props }, ref) => {
    return (
      <nav ref={ref} className={className} {...props}>
        <ul
          role={orientation === "horizontal" ? "menubar" : "menu"}
          className={cn(
            orientation === "horizontal"
              ? "flex items-center gap-1"
              : "flex flex-col gap-0.5"
          )}
        >
          {children}
        </ul>
      </nav>
    );
  }
);

NavMenu.displayName = "NavMenu";

export interface NavMenuItemProps extends HTMLAttributes<HTMLLIElement> {}

export const NavMenuItem = forwardRef<HTMLLIElement, NavMenuItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <li
        ref={ref}
        role="none"
        className={cn("list-none", className)}
        {...props}
      />
    );
  }
);

NavMenuItem.displayName = "NavMenuItem";

const navMenuLinkVariants = cva(
  "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
  {
    variants: {
      active: {
        true: "bg-gray-100 text-gray-900 font-medium",
        false: "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

export interface NavMenuLinkProps
  extends HTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof navMenuLinkVariants> {
  href?: string;
  active?: boolean;
}

export const NavMenuLink = forwardRef<HTMLAnchorElement, NavMenuLinkProps>(
  ({ className, active = false, ...props }, ref) => {
    return (
      <a
        ref={ref}
        role="menuitem"
        aria-current={active ? "page" : undefined}
        className={cn(navMenuLinkVariants({ active }), className)}
        {...props}
      />
    );
  }
);

NavMenuLink.displayName = "NavMenuLink";

export { navMenuLinkVariants };
