import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Select } from "./Select";

const renderOptions = () => (
  <>
    <option value="apple">Apple</option>
    <option value="banana">Banana</option>
    <option value="cherry">Cherry</option>
  </>
);

describe("Select", () => {
  it("renders a select element", () => {
    render(
      <Select aria-label="fruit">{renderOptions()}</Select>
    );
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renders options", () => {
    render(
      <Select aria-label="fruit">{renderOptions()}</Select>
    );
    expect(screen.getAllByRole("option")).toHaveLength(3);
  });

  it("handles value changes", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(
      <Select aria-label="fruit" onChange={handleChange}>
        {renderOptions()}
      </Select>
    );

    await user.selectOptions(screen.getByRole("combobox"), "banana");
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("combobox")).toHaveValue("banana");
  });

  it("shows placeholder option when provided", () => {
    render(
      <Select aria-label="fruit" placeholder="Choose a fruit" defaultValue="">
        {renderOptions()}
      </Select>
    );
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(4);
    expect(options[0]).toHaveTextContent("Choose a fruit");
    expect(options[0]).toBeDisabled();
    expect(options[0]).toHaveValue("");
  });

  it("shows error state classes", () => {
    render(
      <Select aria-label="fruit" error>{renderOptions()}</Select>
    );
    const select = screen.getByRole("combobox");
    expect(select).toHaveAttribute("aria-invalid", "true");
  });

  it("disables properly", () => {
    render(
      <Select aria-label="fruit" disabled>{renderOptions()}</Select>
    );
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("forwards ref", () => {
    const ref = { current: null } as React.RefObject<HTMLSelectElement | null>;
    render(
      <Select ref={ref} aria-label="fruit">{renderOptions()}</Select>
    );
    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
  });

  it("applies custom className", () => {
    render(
      <Select aria-label="fruit" className="custom-class">
        {renderOptions()}
      </Select>
    );
    expect(screen.getByRole("combobox")).toHaveClass("custom-class");
  });
});
