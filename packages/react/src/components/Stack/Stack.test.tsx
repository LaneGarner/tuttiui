import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Stack, VStack, HStack } from "./Stack";

describe("Stack", () => {
  it("renders children", () => {
    render(
      <Stack>
        <span>Child 1</span>
        <span>Child 2</span>
      </Stack>
    );
    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();
  });

  it("applies direction classes", () => {
    const { rerender } = render(
      <Stack data-testid="stack" direction="column">
        <span>Item</span>
      </Stack>
    );
    expect(screen.getByTestId("stack")).toHaveClass("flex-col");

    rerender(
      <Stack data-testid="stack" direction="row">
        <span>Item</span>
      </Stack>
    );
    expect(screen.getByTestId("stack")).toHaveClass("flex-row");
  });

  it("applies spacing classes", () => {
    const { rerender } = render(
      <Stack data-testid="stack" spacing="none">
        <span>Item</span>
      </Stack>
    );
    expect(screen.getByTestId("stack")).toHaveClass("gap-0");

    rerender(
      <Stack data-testid="stack" spacing="xs">
        <span>Item</span>
      </Stack>
    );
    expect(screen.getByTestId("stack")).toHaveClass("gap-1");

    rerender(
      <Stack data-testid="stack" spacing="sm">
        <span>Item</span>
      </Stack>
    );
    expect(screen.getByTestId("stack")).toHaveClass("gap-2");

    rerender(
      <Stack data-testid="stack" spacing="lg">
        <span>Item</span>
      </Stack>
    );
    expect(screen.getByTestId("stack")).toHaveClass("gap-6");

    rerender(
      <Stack data-testid="stack" spacing="xl">
        <span>Item</span>
      </Stack>
    );
    expect(screen.getByTestId("stack")).toHaveClass("gap-8");
  });

  it("applies align classes", () => {
    render(
      <Stack data-testid="stack" align="center">
        <span>Item</span>
      </Stack>
    );
    expect(screen.getByTestId("stack")).toHaveClass("items-center");
  });

  it("applies justify classes", () => {
    render(
      <Stack data-testid="stack" justify="between">
        <span>Item</span>
      </Stack>
    );
    expect(screen.getByTestId("stack")).toHaveClass("justify-between");
  });

  it("applies wrap class", () => {
    render(
      <Stack data-testid="stack" wrap>
        <span>Item</span>
      </Stack>
    );
    expect(screen.getByTestId("stack")).toHaveClass("flex-wrap");
  });

  it("forwards ref", () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement | null>;
    render(
      <Stack ref={ref}>
        <span>Item</span>
      </Stack>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("applies custom className", () => {
    render(
      <Stack data-testid="stack" className="custom-class">
        <span>Item</span>
      </Stack>
    );
    expect(screen.getByTestId("stack")).toHaveClass("custom-class");
  });
});

describe("VStack", () => {
  it("defaults to flex-col", () => {
    render(
      <VStack data-testid="vstack">
        <span>Item</span>
      </VStack>
    );
    expect(screen.getByTestId("vstack")).toHaveClass("flex-col");
  });

  it("forwards ref", () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement | null>;
    render(
      <VStack ref={ref}>
        <span>Item</span>
      </VStack>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe("HStack", () => {
  it("defaults to flex-row", () => {
    render(
      <HStack data-testid="hstack">
        <span>Item</span>
      </HStack>
    );
    expect(screen.getByTestId("hstack")).toHaveClass("flex-row");
  });

  it("forwards ref", () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement | null>;
    render(
      <HStack ref={ref}>
        <span>Item</span>
      </HStack>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
