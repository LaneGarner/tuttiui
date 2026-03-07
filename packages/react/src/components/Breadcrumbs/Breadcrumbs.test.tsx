import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import {
  Breadcrumbs,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./Breadcrumbs";

describe("Breadcrumbs", () => {
  it("renders nav with aria-label='Breadcrumb'", () => {
    render(
      <Breadcrumbs>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumbs>
    );
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("aria-label", "Breadcrumb");
  });

  it("renders breadcrumb items", () => {
    render(
      <Breadcrumbs>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbPage>Current</BreadcrumbPage>
        </BreadcrumbItem>
      </Breadcrumbs>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Current")).toBeInTheDocument();
  });

  it("renders BreadcrumbLink as anchor with href", () => {
    render(
      <Breadcrumbs>
        <BreadcrumbItem>
          <BreadcrumbLink href="/products">Products</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumbs>
    );
    const link = screen.getByText("Products");
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/products");
  });

  it("renders BreadcrumbPage with aria-current='page'", () => {
    render(
      <Breadcrumbs>
        <BreadcrumbItem>
          <BreadcrumbPage>Current Page</BreadcrumbPage>
        </BreadcrumbItem>
      </Breadcrumbs>
    );
    const page = screen.getByText("Current Page");
    expect(page).toHaveAttribute("aria-current", "page");
  });

  it("renders BreadcrumbSeparator with aria-hidden", () => {
    render(
      <Breadcrumbs>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbPage>Current</BreadcrumbPage>
        </BreadcrumbItem>
      </Breadcrumbs>
    );
    const separators = screen.getAllByRole("presentation", { hidden: true });
    expect(separators[0]).toHaveAttribute("aria-hidden", "true");
    expect(separators[0]).toHaveTextContent("/");
  });

  it("renders custom separator", () => {
    render(
      <Breadcrumbs separator=">">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbPage>Current</BreadcrumbPage>
        </BreadcrumbItem>
      </Breadcrumbs>
    );
    const separators = screen.getAllByRole("presentation", { hidden: true });
    expect(separators[0]).toHaveTextContent(">");
  });

  it("forwards ref", () => {
    const ref = { current: null } as React.RefObject<HTMLElement | null>;
    render(
      <Breadcrumbs ref={ref}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumbs>
    );
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it("applies custom className", () => {
    render(
      <Breadcrumbs className="custom-class" data-testid="breadcrumbs">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumbs>
    );
    expect(screen.getByTestId("breadcrumbs")).toHaveClass("custom-class");
  });
});
