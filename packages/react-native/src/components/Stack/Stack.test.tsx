import { createRef } from "react";
import { View, Text } from "react-native";
import { render, screen } from "@testing-library/react-native";
import { Stack, VStack, HStack } from "./Stack";

describe("Stack", () => {
  it("renders children", () => {
    render(
      <Stack>
        <Text>Child 1</Text>
        <Text>Child 2</Text>
      </Stack>
    );
    expect(screen.getByText("Child 1")).toBeTruthy();
    expect(screen.getByText("Child 2")).toBeTruthy();
  });

  it("forwards ref", () => {
    const ref = createRef<View>();
    render(<Stack ref={ref}><Text>Test</Text></Stack>);
    expect(ref.current).toBeTruthy();
  });

  it("accepts spacing prop", () => {
    render(
      <Stack testID="stack" spacing="lg">
        <Text>A</Text>
      </Stack>
    );
    expect(screen.getByTestId("stack")).toBeTruthy();
  });

  it("accepts align and justify props", () => {
    render(
      <Stack testID="stack" align="center" justify="between">
        <Text>A</Text>
      </Stack>
    );
    expect(screen.getByTestId("stack")).toBeTruthy();
  });
});

describe("VStack", () => {
  it("renders children in a column", () => {
    render(
      <VStack>
        <Text>A</Text>
        <Text>B</Text>
      </VStack>
    );
    expect(screen.getByText("A")).toBeTruthy();
    expect(screen.getByText("B")).toBeTruthy();
  });

  it("forwards ref", () => {
    const ref = createRef<View>();
    render(<VStack ref={ref}><Text>Test</Text></VStack>);
    expect(ref.current).toBeTruthy();
  });
});

describe("HStack", () => {
  it("renders children in a row", () => {
    render(
      <HStack>
        <Text>A</Text>
        <Text>B</Text>
      </HStack>
    );
    expect(screen.getByText("A")).toBeTruthy();
    expect(screen.getByText("B")).toBeTruthy();
  });

  it("forwards ref", () => {
    const ref = createRef<View>();
    render(<HStack ref={ref}><Text>Test</Text></HStack>);
    expect(ref.current).toBeTruthy();
  });
});
