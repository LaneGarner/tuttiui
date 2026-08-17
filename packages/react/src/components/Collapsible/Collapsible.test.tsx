import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./Collapsible";

const renderCollapsible = (props: Record<string, unknown> = {}) =>
  render(
    <Collapsible {...props}>
      <CollapsibleTrigger>Toggle</CollapsibleTrigger>
      <CollapsibleContent>Hidden details</CollapsibleContent>
    </Collapsible>
  );

describe("Collapsible", () => {
  it("renders closed by default", () => {
    renderCollapsible();
    const trigger = screen.getByRole("button", { name: "Toggle" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveAttribute("data-state", "closed");
  });

  it("renders open with defaultOpen", () => {
    renderCollapsible({ defaultOpen: true });
    const trigger = screen.getByRole("button", { name: "Toggle" });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(trigger).toHaveAttribute("data-state", "open");
  });

  it("toggles open and closed when clicking the trigger", async () => {
    const user = userEvent.setup();
    renderCollapsible();
    const trigger = screen.getByRole("button", { name: "Toggle" });

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("supports controlled mode with open and onOpenChange", async () => {
    const user = userEvent.setup();
    const handleOpenChange = jest.fn();
    const { rerender } = render(
      <Collapsible open={false} onOpenChange={handleOpenChange}>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Hidden details</CollapsibleContent>
      </Collapsible>
    );

    const trigger = screen.getByRole("button", { name: "Toggle" });
    await user.click(trigger);
    expect(handleOpenChange).toHaveBeenCalledWith(true);
    // Still closed because controlled
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    rerender(
      <Collapsible open onOpenChange={handleOpenChange}>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Hidden details</CollapsibleContent>
      </Collapsible>
    );
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("calls onOpenChange with the next state in uncontrolled mode", async () => {
    const user = userEvent.setup();
    const handleOpenChange = jest.fn();
    renderCollapsible({ onOpenChange: handleOpenChange });

    await user.click(screen.getByRole("button", { name: "Toggle" }));
    expect(handleOpenChange).toHaveBeenCalledWith(true);

    await user.click(screen.getByRole("button", { name: "Toggle" }));
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it("wires aria-controls on the trigger to the content id", () => {
    renderCollapsible({ defaultOpen: true });
    const trigger = screen.getByRole("button", { name: "Toggle" });
    const content = screen.getByText("Hidden details").parentElement!;

    expect(trigger).toHaveAttribute("aria-controls", content.id);
    expect(content.id).not.toBe("");
  });

  it("hides content from the accessibility tree when closed", async () => {
    const user = userEvent.setup();
    renderCollapsible();
    const content = screen.getByText("Hidden details").parentElement!;

    expect(content).toHaveAttribute("aria-hidden", "true");

    await user.click(screen.getByRole("button", { name: "Toggle" }));
    expect(content).not.toHaveAttribute("aria-hidden");
  });

  it("sets data-state on root, trigger, and content", async () => {
    const user = userEvent.setup();
    const { container } = renderCollapsible();
    const root = container.firstElementChild!;
    const trigger = screen.getByRole("button", { name: "Toggle" });
    const content = screen.getByText("Hidden details").parentElement!;

    expect(root).toHaveAttribute("data-state", "closed");
    expect(trigger).toHaveAttribute("data-state", "closed");
    expect(content).toHaveAttribute("data-state", "closed");

    await user.click(trigger);
    expect(root).toHaveAttribute("data-state", "open");
    expect(trigger).toHaveAttribute("data-state", "open");
    expect(content).toHaveAttribute("data-state", "open");
  });

  it("forwards refs on all parts", () => {
    const rootRef = createRef<HTMLDivElement>();
    const triggerRef = createRef<HTMLButtonElement>();
    const contentRef = createRef<HTMLDivElement>();
    render(
      <Collapsible ref={rootRef}>
        <CollapsibleTrigger ref={triggerRef}>Toggle</CollapsibleTrigger>
        <CollapsibleContent ref={contentRef}>Hidden details</CollapsibleContent>
      </Collapsible>
    );
    expect(rootRef.current).toBeInstanceOf(HTMLDivElement);
    expect(triggerRef.current).toBeInstanceOf(HTMLButtonElement);
    expect(contentRef.current).toBeInstanceOf(HTMLDivElement);
  });

  it("merges consumer className on trigger and content", () => {
    render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="custom-trigger">
          Toggle
        </CollapsibleTrigger>
        <CollapsibleContent className="custom-content">
          Hidden details
        </CollapsibleContent>
      </Collapsible>
    );
    expect(screen.getByRole("button", { name: "Toggle" })).toHaveClass(
      "custom-trigger"
    );
    expect(screen.getByText("Hidden details").parentElement).toHaveClass(
      "custom-content"
    );
  });

  it("throws when trigger or content is used outside a Collapsible", () => {
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() =>
      render(<CollapsibleTrigger>Toggle</CollapsibleTrigger>)
    ).toThrow(
      "CollapsibleTrigger/CollapsibleContent must be used within a Collapsible"
    );
    expect(() =>
      render(<CollapsibleContent>Details</CollapsibleContent>)
    ).toThrow(
      "CollapsibleTrigger/CollapsibleContent must be used within a Collapsible"
    );

    consoleError.mockRestore();
  });
});
