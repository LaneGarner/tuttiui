import { createRef } from "react";
import { View, Image } from "react-native";
import { render, screen } from "@testing-library/react-native";
import { Avatar, AvatarImage, AvatarFallback } from "./Avatar";

describe("Avatar", () => {
  it("renders", () => {
    render(
      <Avatar testID="avatar">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByTestId("avatar")).toBeTruthy();
  });

  it("forwards ref", () => {
    const ref = createRef<View>();
    render(
      <Avatar ref={ref}>
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    );
    expect(ref.current).toBeTruthy();
  });

  it("passes additional props", () => {
    render(
      <Avatar testID="avatar-test">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByTestId("avatar-test")).toBeTruthy();
  });
});

describe("Avatar size variants", () => {
  it("renders sm size", () => {
    render(
      <Avatar size="sm" testID="avatar">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByTestId("avatar")).toBeTruthy();
  });

  it("renders md size", () => {
    render(
      <Avatar size="md" testID="avatar">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByTestId("avatar")).toBeTruthy();
  });

  it("renders lg size", () => {
    render(
      <Avatar size="lg" testID="avatar">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByTestId("avatar")).toBeTruthy();
  });

  it("renders xl size", () => {
    render(
      <Avatar size="xl" testID="avatar">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByTestId("avatar")).toBeTruthy();
  });
});

describe("AvatarFallback", () => {
  it("renders fallback text when no image is provided", () => {
    render(
      <Avatar>
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByText("LG")).toBeTruthy();
  });

  it("forwards ref", () => {
    const ref = createRef<View>();
    render(
      <Avatar>
        <AvatarFallback ref={ref}>LG</AvatarFallback>
      </Avatar>
    );
    expect(ref.current).toBeTruthy();
  });

  it("renders with different sizes in context", () => {
    render(
      <Avatar size="sm">
        <AvatarFallback testID="fallback">SM</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByText("SM")).toBeTruthy();
  });

  it("renders with xl size in context", () => {
    render(
      <Avatar size="xl">
        <AvatarFallback testID="fallback">XL</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByText("XL")).toBeTruthy();
  });
});

describe("AvatarImage", () => {
  it("shows fallback when image has no src", () => {
    render(
      <Avatar>
        <AvatarImage src="" alt="User" />
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    );
    // Image.prefetch will fail with empty src, so fallback is shown
    expect(screen.getByText("LG")).toBeTruthy();
  });

  it("renders with src (prefetch won't resolve in test)", () => {
    render(
      <Avatar>
        <AvatarImage src="https://example.com/avatar.jpg" alt="User" />
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    );
    // In test env, Image.prefetch won't resolve, fallback shown
    expect(screen.getByText("LG")).toBeTruthy();
  });
});
