import { createRef } from "react";
import { View } from "react-native";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { Alert, AlertTitle, AlertDescription } from "./Alert";

describe("Alert", () => {
  it("renders with alert role", () => {
    render(<Alert><AlertTitle>Alert content</AlertTitle></Alert>);
    expect(screen.getByRole("alert")).toBeTruthy();
  });

  it("renders children", () => {
    render(
      <Alert>
        <AlertTitle>Hello</AlertTitle>
      </Alert>
    );
    expect(screen.getByText("Hello")).toBeTruthy();
  });

  it("accepts default variant", () => {
    render(
      <Alert testID="alert">
        <AlertTitle>Default</AlertTitle>
      </Alert>
    );
    expect(screen.getByTestId("alert")).toBeTruthy();
  });

  it("accepts info variant", () => {
    render(
      <Alert variant="info" testID="alert">
        <AlertTitle>Info</AlertTitle>
      </Alert>
    );
    expect(screen.getByTestId("alert")).toBeTruthy();
  });

  it("accepts success variant", () => {
    render(
      <Alert variant="success" testID="alert">
        <AlertTitle>Success</AlertTitle>
      </Alert>
    );
    expect(screen.getByTestId("alert")).toBeTruthy();
  });

  it("accepts warning variant", () => {
    render(
      <Alert variant="warning" testID="alert">
        <AlertTitle>Warning</AlertTitle>
      </Alert>
    );
    expect(screen.getByTestId("alert")).toBeTruthy();
  });

  it("accepts error variant", () => {
    render(
      <Alert variant="error" testID="alert">
        <AlertTitle>Error</AlertTitle>
      </Alert>
    );
    expect(screen.getByTestId("alert")).toBeTruthy();
  });

  it("shows dismiss button when onDismiss is provided", () => {
    render(
      <Alert onDismiss={() => {}}>
        <AlertTitle>Dismissible</AlertTitle>
      </Alert>
    );
    expect(screen.getByLabelText("Dismiss")).toBeTruthy();
  });

  it("does not show dismiss button when onDismiss is not provided", () => {
    render(
      <Alert>
        <AlertTitle>Not dismissible</AlertTitle>
      </Alert>
    );
    expect(screen.queryByLabelText("Dismiss")).toBeNull();
  });

  it("calls onDismiss when dismiss button is pressed", () => {
    const handleDismiss = jest.fn();
    render(
      <Alert onDismiss={handleDismiss}>
        <AlertTitle>Dismissible</AlertTitle>
      </Alert>
    );
    fireEvent.press(screen.getByLabelText("Dismiss"));
    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  it("forwards ref", () => {
    const ref = createRef<View>();
    render(
      <Alert ref={ref}>
        <AlertTitle>Ref test</AlertTitle>
      </Alert>
    );
    expect(ref.current).toBeTruthy();
  });

  it("passes additional props", () => {
    render(
      <Alert testID="alert-test">
        <AlertTitle>Test</AlertTitle>
      </Alert>
    );
    expect(screen.getByTestId("alert-test")).toBeTruthy();
  });
});

describe("AlertTitle", () => {
  it("renders text", () => {
    render(
      <Alert>
        <AlertTitle>Title text</AlertTitle>
      </Alert>
    );
    expect(screen.getByText("Title text")).toBeTruthy();
  });

  it("forwards ref", () => {
    const ref = createRef<View>();
    render(<AlertTitle ref={ref as any}>Title</AlertTitle>);
    expect(ref.current).toBeTruthy();
  });
});

describe("AlertDescription", () => {
  it("renders text", () => {
    render(
      <Alert>
        <AlertDescription>Description text</AlertDescription>
      </Alert>
    );
    expect(screen.getByText("Description text")).toBeTruthy();
  });

  it("forwards ref", () => {
    const ref = createRef<View>();
    render(<AlertDescription ref={ref as any}>Desc</AlertDescription>);
    expect(ref.current).toBeTruthy();
  });
});

describe("Alert composition", () => {
  it("renders title and description together", () => {
    render(
      <Alert>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>Something happened.</AlertDescription>
      </Alert>
    );
    expect(screen.getByText("Heads up!")).toBeTruthy();
    expect(screen.getByText("Something happened.")).toBeTruthy();
  });
});
