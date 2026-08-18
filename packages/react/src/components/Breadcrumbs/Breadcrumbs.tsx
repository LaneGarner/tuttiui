import { forwardRef, type HTMLAttributes, type ReactNode, Children, Fragment } from "react";
import { cn } from "@tuttiui/shared";

export interface BreadcrumbsProps extends HTMLAttributes<HTMLElement> {
  separator?: ReactNode;
}

export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ className, children, separator, ...props }, ref) => {
    const items = Children.toArray(children);

    return (
      <nav ref={ref} aria-label="Breadcrumb" className={className} {...props}>
        <ol className="flex flex-wrap items-center gap-1.5 text-sm">
          {items.map((child, index) => (
            <Fragment key={index}>
              {child}
              {index < items.length - 1 && (
                <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
              )}
            </Fragment>
          ))}
        </ol>
      </nav>
    );
  }
);

Breadcrumbs.displayName = "Breadcrumbs";

export interface BreadcrumbItemProps extends HTMLAttributes<HTMLLIElement> {}

export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={cn("inline-flex items-center gap-1.5", className)}
        {...props}
      />
    );
  }
);

BreadcrumbItem.displayName = "BreadcrumbItem";

export interface BreadcrumbLinkProps
  extends HTMLAttributes<HTMLAnchorElement> {
  href?: string;
}

export const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ className, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(
          "text-tt-fg-subtle hover:text-tt-fg transition-colors",
          className
        )}
        {...props}
      />
    );
  }
);

BreadcrumbLink.displayName = "BreadcrumbLink";

export interface BreadcrumbSeparatorProps
  extends HTMLAttributes<HTMLSpanElement> {}

export const BreadcrumbSeparator: React.FC<BreadcrumbSeparatorProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={cn("text-tt-fg-faint", className)}
      {...props}
    >
      {children ?? "/"}
    </span>
  );
};

BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export interface BreadcrumbPageProps extends HTMLAttributes<HTMLSpanElement> {}

export const BreadcrumbPage = forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        role="link"
        aria-current="page"
        aria-disabled="true"
        className={cn("text-tt-fg font-medium", className)}
        {...props}
      />
    );
  }
);

BreadcrumbPage.displayName = "BreadcrumbPage";
