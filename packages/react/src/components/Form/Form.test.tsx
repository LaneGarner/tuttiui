import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { FormField, useFormField } from "./FormField";
import { FormError } from "./FormError";
import { FormHint } from "./FormHint";

describe("FormField", () => {
  it("renders children", () => {
    render(
      <FormField id="test">
        <span>Child content</span>
      </FormField>
    );
    expect(screen.getByText("Child content")).toBeInTheDocument();
  });

  it("provides context values", () => {
    const Consumer = () => {
      const { id, error, required, name } = useFormField();
      return (
        <div>
          <span data-testid="id">{id}</span>
          <span data-testid="error">{error}</span>
          <span data-testid="required">{required ? "true" : "false"}</span>
          <span data-testid="name">{name}</span>
        </div>
      );
    };

    render(
      <FormField id="email" error="Required" required name="email">
        <Consumer />
      </FormField>
    );

    expect(screen.getByTestId("id")).toHaveTextContent("email");
    expect(screen.getByTestId("error")).toHaveTextContent("Required");
    expect(screen.getByTestId("required")).toHaveTextContent("true");
    expect(screen.getByTestId("name")).toHaveTextContent("email");
  });

  it("throws when useFormField is used outside FormField", () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    const BadConsumer = () => {
      useFormField();
      return <div />;
    };

    expect(() => render(<BadConsumer />)).toThrow(
      "useFormField must be used within a FormField"
    );

    consoleSpy.mockRestore();
  });
});

describe("FormError", () => {
  it("renders with alert role and correct id", () => {
    render(
      <FormField id="username">
        <FormError>Username is required</FormError>
      </FormField>
    );

    const error = screen.getByRole("alert");
    expect(error).toHaveTextContent("Username is required");
    expect(error).toHaveAttribute("id", "username-error");
  });

  it("returns null when no children", () => {
    const { container } = render(
      <FormField id="username">
        <FormError>{undefined as unknown as React.ReactNode}</FormError>
      </FormField>
    );

    expect(container.querySelector("#username-error")).not.toBeInTheDocument();
  });
});

describe("FormHint", () => {
  it("renders with correct id", () => {
    render(
      <FormField id="password">
        <FormHint>Must be at least 8 characters</FormHint>
      </FormField>
    );

    const hint = screen.getByText("Must be at least 8 characters");
    expect(hint).toHaveAttribute("id", "password-hint");
  });
});

describe("Form composition", () => {
  it("renders a complete form field with label, input, error, and hint", () => {
    render(
      <FormField id="email" error="Invalid email" required name="email">
        <label htmlFor="email">Email address</label>
        <input id="email" type="email" aria-describedby="email-hint email-error" />
        <FormHint>We will never share your email</FormHint>
        <FormError>Invalid email</FormError>
      </FormField>
    );

    expect(screen.getByText("Email address")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveAttribute("id", "email");
    expect(screen.getByText("We will never share your email")).toHaveAttribute(
      "id",
      "email-hint"
    );
    expect(screen.getByRole("alert")).toHaveAttribute("id", "email-error");
    expect(screen.getByRole("alert")).toHaveTextContent("Invalid email");
  });
});
