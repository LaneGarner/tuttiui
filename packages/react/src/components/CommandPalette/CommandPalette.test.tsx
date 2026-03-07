import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CommandPalette, type CommandItem } from "./CommandPalette";

const sampleItems: CommandItem[] = [
  {
    id: "1",
    label: "Go to Dashboard",
    category: "Navigation",
    shortcut: "Ctrl+D",
    onSelect: jest.fn(),
  },
  {
    id: "2",
    label: "Create New File",
    category: "Actions",
    shortcut: "Ctrl+N",
    onSelect: jest.fn(),
  },
  {
    id: "3",
    label: "Open Settings",
    onSelect: jest.fn(),
  },
  {
    id: "4",
    label: "Disabled Action",
    onSelect: jest.fn(),
    disabled: true,
  },
];

function createItems(): CommandItem[] {
  return sampleItems.map((item) => ({ ...item, onSelect: jest.fn() }));
}

describe("CommandPalette", () => {
  it("is hidden when open=false", () => {
    render(
      <CommandPalette
        open={false}
        onOpenChange={jest.fn()}
        items={sampleItems}
      />
    );
    expect(
      screen.queryByTestId("command-palette-input")
    ).not.toBeInTheDocument();
  });

  it("shows when open=true", () => {
    render(
      <CommandPalette
        open={true}
        onOpenChange={jest.fn()}
        items={sampleItems}
      />
    );
    expect(screen.getByTestId("command-palette-input")).toBeInTheDocument();
    expect(screen.getByText("Go to Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Create New File")).toBeInTheDocument();
    expect(screen.getByText("Open Settings")).toBeInTheDocument();
  });

  it("search input filters items", async () => {
    const user = userEvent.setup();
    render(
      <CommandPalette
        open={true}
        onOpenChange={jest.fn()}
        items={sampleItems}
      />
    );

    const input = screen.getByTestId("command-palette-input");
    await user.type(input, "dashboard");

    expect(screen.getByText("Go to Dashboard")).toBeInTheDocument();
    expect(screen.queryByText("Create New File")).not.toBeInTheDocument();
    expect(screen.queryByText("Open Settings")).not.toBeInTheDocument();
  });

  it("keyboard ArrowDown/ArrowUp navigates items", async () => {
    const user = userEvent.setup();
    render(
      <CommandPalette
        open={true}
        onOpenChange={jest.fn()}
        items={sampleItems}
      />
    );

    const input = screen.getByTestId("command-palette-input");

    // First enabled item should be selected initially
    const firstItem = screen.getByTestId("command-item-1");
    expect(firstItem).toHaveAttribute("aria-selected", "true");

    // ArrowDown to second item
    await user.type(input, "{ArrowDown}");
    const secondItem = screen.getByTestId("command-item-2");
    expect(secondItem).toHaveAttribute("aria-selected", "true");

    // ArrowUp back to first item
    await user.type(input, "{ArrowUp}");
    expect(firstItem).toHaveAttribute("aria-selected", "true");
  });

  it("Enter selects item and calls onSelect", async () => {
    const user = userEvent.setup();
    const items = createItems();
    const onOpenChange = jest.fn();

    render(
      <CommandPalette
        open={true}
        onOpenChange={onOpenChange}
        items={items}
      />
    );

    const input = screen.getByTestId("command-palette-input");
    await user.type(input, "{Enter}");

    expect(items[0].onSelect).toHaveBeenCalled();
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("Escape closes palette", async () => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();

    render(
      <CommandPalette
        open={true}
        onOpenChange={onOpenChange}
        items={sampleItems}
      />
    );

    const input = screen.getByTestId("command-palette-input");
    await user.type(input, "{Escape}");

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("empty state shows when no results", async () => {
    const user = userEvent.setup();
    render(
      <CommandPalette
        open={true}
        onOpenChange={jest.fn()}
        items={sampleItems}
      />
    );

    const input = screen.getByTestId("command-palette-input");
    await user.type(input, "zzzzzzz");

    expect(screen.getByText("No results found.")).toBeInTheDocument();
  });

  it("shows custom empty message", async () => {
    const user = userEvent.setup();
    render(
      <CommandPalette
        open={true}
        onOpenChange={jest.fn()}
        items={sampleItems}
        emptyMessage="Nothing here."
      />
    );

    const input = screen.getByTestId("command-palette-input");
    await user.type(input, "zzzzzzz");

    expect(screen.getByText("Nothing here.")).toBeInTheDocument();
  });

  it("clicking overlay closes", () => {
    const onOpenChange = jest.fn();
    render(
      <CommandPalette
        open={true}
        onOpenChange={onOpenChange}
        items={sampleItems}
      />
    );

    const overlay = screen.getByTestId("command-palette-overlay");
    fireEvent.click(overlay);

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("disabled items are skipped in keyboard nav", async () => {
    const user = userEvent.setup();
    // Items: 1 (enabled), 2 (enabled), 3 (enabled), 4 (disabled)
    render(
      <CommandPalette
        open={true}
        onOpenChange={jest.fn()}
        items={sampleItems}
      />
    );

    const input = screen.getByTestId("command-palette-input");

    // Navigate down past item 3 (index 2) - should wrap to item 1 (index 0), skipping disabled
    await user.type(input, "{ArrowDown}"); // -> item 2
    await user.type(input, "{ArrowDown}"); // -> item 3
    await user.type(input, "{ArrowDown}"); // -> wraps to item 1 (skips disabled item 4)

    const firstItem = screen.getByTestId("command-item-1");
    expect(firstItem).toHaveAttribute("aria-selected", "true");
  });

  it("shortcut and category render", () => {
    render(
      <CommandPalette
        open={true}
        onOpenChange={jest.fn()}
        items={sampleItems}
      />
    );

    expect(screen.getByText("Navigation")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
    expect(screen.getByText("Ctrl+D")).toBeInTheDocument();
    expect(screen.getByText("Ctrl+N")).toBeInTheDocument();
  });

  it("disabled items have correct classes", () => {
    render(
      <CommandPalette
        open={true}
        onOpenChange={jest.fn()}
        items={sampleItems}
      />
    );

    const disabledItem = screen.getByTestId("command-item-4");
    expect(disabledItem).toHaveClass("opacity-50");
    expect(disabledItem).toHaveClass("cursor-not-allowed");
  });

  it("clicking a disabled item does not call onSelect", () => {
    const items = createItems();
    const onOpenChange = jest.fn();

    render(
      <CommandPalette
        open={true}
        onOpenChange={onOpenChange}
        items={items}
      />
    );

    const disabledItem = screen.getByTestId("command-item-4");
    fireEvent.click(disabledItem);

    expect(items[3].onSelect).not.toHaveBeenCalled();
    expect(onOpenChange).not.toHaveBeenCalledWith(false);
  });
});
