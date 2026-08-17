import {
  forwardRef,
  createContext,
  useContext,
  type HTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@tutti-ui/shared";

interface SidebarContextValue {
  collapsed: boolean;
}

const SidebarContext = createContext<SidebarContextValue>({ collapsed: false });

function useSidebarContext() {
  return useContext(SidebarContext);
}

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  width?: string;
  collapsedWidth?: string;
}

export const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  (
    {
      collapsed = false,
      onCollapsedChange,
      width = "16rem",
      collapsedWidth = "4rem",
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <SidebarContext.Provider value={{ collapsed }}>
        <aside
          ref={ref}
          role="complementary"
          className={cn(
            "flex flex-col border-r border-tt-border bg-tt-surface text-tt-fg transition-all duration-200 h-full overflow-hidden",
            className
          )}
          style={{
            width: collapsed ? collapsedWidth : width,
            ...style,
          }}
          {...props}
        >
          {children}
        </aside>
      </SidebarContext.Provider>
    );
  }
);

Sidebar.displayName = "Sidebar";

export interface SidebarHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center p-4 border-b border-tt-border",
          className
        )}
        {...props}
      />
    );
  }
);

SidebarHeader.displayName = "SidebarHeader";

export interface SidebarContentProps extends HTMLAttributes<HTMLDivElement> {}

export const SidebarContent = forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex-1 overflow-y-auto p-2", className)}
        {...props}
      />
    );
  }
);

SidebarContent.displayName = "SidebarContent";

export interface SidebarFooterProps extends HTMLAttributes<HTMLDivElement> {}

export const SidebarFooter = forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("p-4 border-t border-tt-border", className)}
        {...props}
      />
    );
  }
);

SidebarFooter.displayName = "SidebarFooter";

export interface SidebarGroupProps extends HTMLAttributes<HTMLDivElement> {}

export const SidebarGroup = forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("py-2", className)} {...props} />;
  }
);

SidebarGroup.displayName = "SidebarGroup";

export interface SidebarGroupLabelProps
  extends HTMLAttributes<HTMLDivElement> {}

export const SidebarGroupLabel = forwardRef<
  HTMLDivElement,
  SidebarGroupLabelProps
>(({ className, ...props }, ref) => {
  const { collapsed } = useSidebarContext();

  return (
    <div
      ref={ref}
      className={cn(
        "px-3 py-1.5 text-xs font-semibold text-tt-fg-faint uppercase tracking-wider",
        collapsed && "overflow-hidden whitespace-nowrap",
        className
      )}
      {...props}
    />
  );
});

SidebarGroupLabel.displayName = "SidebarGroupLabel";

export interface SidebarItemProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  icon?: ReactNode;
}

export const SidebarItem = forwardRef<HTMLButtonElement, SidebarItemProps>(
  ({ active = false, icon, className, children, ...props }, ref) => {
    const { collapsed } = useSidebarContext();

    return (
      <button
        ref={ref}
        type="button"
        data-active={active ? "true" : "false"}
        className={cn(
          "flex items-center gap-3 w-full rounded-md px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tt-focus",
          active
            ? "bg-tt-surface-active text-tt-fg font-medium"
            : "text-tt-fg-muted hover:text-tt-fg hover:bg-tt-surface-hover",
          collapsed && "overflow-hidden whitespace-nowrap",
          className
        )}
        {...props}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </button>
    );
  }
);

SidebarItem.displayName = "SidebarItem";
