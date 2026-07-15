import { createRef } from "react";
import { Text, View } from "react-native";
import { render, screen } from "@testing-library/react-native";
import { FormField, useFormField } from "./FormField";
import { FormError } from "./FormError";
import { FormHint } from "./FormHint";

describe("FormField", () => {
  it("renders children", () => {
    render(
      <FormField id="test">
        <Text>Child content</Text>
      </FormField>
    );
    expect(screen.getByText("Child content")).toBeTruthy();
  });

  it("provides context values", () => {
    const Consumer = () => {
      const { id, error, required, name } = useFormField();
      return (
        <View>
          <Text>{`id:${id}`}</Text>
          <Text>{`error:${error}`}</Text>
          <Text>{`required:${required ? "true" : "false"}`}</Text>
          <Text>{`name:${name}`}</Text>
        </View>
      );
    };

    render(
      <FormField id="email" error="Required" required name="email">
        <Consumer />
      </FormField>
    );

    expect(screen.getByText("id:email")).toBeTruthy();
    expect(screen.getByText("error:Required")).toBeTruthy();
    expect(screen.getByText("required:true")).toBeTruthy();
    expect(screen.getByText("name:email")).toBeTruthy();
  });

  it("throws when useFormField is used outside FormField", () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const BadConsumer = () => {
      useFormField();
      return <View />;
    };

    expect(() => render(<BadConsumer />)).toThrow(
      "useFormField must be used within a FormField"
    );

    consoleSpy.mockRestore();
  });

  it("forwards ref", () => {
    const ref = createRef<View>();
    render(
      <FormField ref={ref} id="test">
        <Text>Child</Text>
      </FormField>
    );
    expect(ref.current).toBeTruthy();
  });
});

describe("FormError", () => {
  it("renders with alert role", () => {
    render(
      <FormField id="username">
        <FormError>Username is required</FormError>
      </FormField>
    );

    const error = screen.getByRole("alert");
    expect(error).toBeTruthy();
    expect(screen.getByText("Username is required")).toBeTruthy();
  });

  it("returns null when no children", () => {
    render(
      <FormField id="username">
        <FormError>{undefined as unknown as React.ReactNode}</FormError>
      </FormField>
    );

    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("forwards ref", () => {
    const ref = createRef<Text>();
    render(
      <FormField id="test">
        <FormError ref={ref}>Error text</FormError>
      </FormField>
    );
    expect(ref.current).toBeTruthy();
  });
});

describe("FormHint", () => {
  it("renders hint text", () => {
    render(
      <FormField id="password">
        <FormHint>Must be at least 8 characters</FormHint>
      </FormField>
    );

    expect(screen.getByText("Must be at least 8 characters")).toBeTruthy();
  });

  it("forwards ref", () => {
    const ref = createRef<Text>();
    render(
      <FormField id="test">
        <FormHint ref={ref}>Hint text</FormHint>
      </FormField>
    );
    expect(ref.current).toBeTruthy();
  });
});

describe("Form composition", () => {
  it("renders a complete form field with error and hint", () => {
    render(
      <FormField id="email" error="Invalid email" required name="email">
        <Text>Email address</Text>
        <FormHint>We will never share your email</FormHint>
        <FormError>Invalid email</FormError>
      </FormField>
    );

    expect(screen.getByText("Email address")).toBeTruthy();
    expect(screen.getByText("We will never share your email")).toBeTruthy();
    expect(screen.getByRole("alert")).toBeTruthy();
    expect(screen.getByText("Invalid email")).toBeTruthy();
  });
});
