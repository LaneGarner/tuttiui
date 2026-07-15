import { createRef } from "react";
import { View, Text } from "react-native";
import { render, screen } from "@testing-library/react-native";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./Card";

describe("Card", () => {
  it("renders with children", () => {
    render(
      <Card>
        <Text>Card content</Text>
      </Card>
    );
    expect(screen.getByText("Card content")).toBeTruthy();
  });

  it("forwards ref", () => {
    const ref = createRef<View>();
    render(
      <Card ref={ref}>
        <Text>Content</Text>
      </Card>
    );
    expect(ref.current).toBeTruthy();
  });

  it("accepts variant prop", () => {
    render(
      <Card variant="elevated" testID="card">
        <Text>Content</Text>
      </Card>
    );
    expect(screen.getByTestId("card")).toBeTruthy();
  });

  it("accepts outline variant", () => {
    render(
      <Card variant="outline" testID="card">
        <Text>Content</Text>
      </Card>
    );
    expect(screen.getByTestId("card")).toBeTruthy();
  });

  it("passes additional props", () => {
    render(
      <Card testID="card-test">
        <Text>Content</Text>
      </Card>
    );
    expect(screen.getByTestId("card-test")).toBeTruthy();
  });
});

describe("CardHeader", () => {
  it("renders with children", () => {
    render(
      <CardHeader>
        <Text>Header content</Text>
      </CardHeader>
    );
    expect(screen.getByText("Header content")).toBeTruthy();
  });

  it("forwards ref", () => {
    const ref = createRef<View>();
    render(
      <CardHeader ref={ref}>
        <Text>Header</Text>
      </CardHeader>
    );
    expect(ref.current).toBeTruthy();
  });
});

describe("CardTitle", () => {
  it("renders text", () => {
    render(<CardTitle>Title</CardTitle>);
    expect(screen.getByText("Title")).toBeTruthy();
  });

  it("forwards ref", () => {
    const ref = createRef<Text>();
    render(<CardTitle ref={ref}>Title</CardTitle>);
    expect(ref.current).toBeTruthy();
  });
});

describe("CardDescription", () => {
  it("renders text", () => {
    render(<CardDescription>Description</CardDescription>);
    expect(screen.getByText("Description")).toBeTruthy();
  });

  it("forwards ref", () => {
    const ref = createRef<Text>();
    render(<CardDescription ref={ref}>Description</CardDescription>);
    expect(ref.current).toBeTruthy();
  });
});

describe("CardContent", () => {
  it("renders with children", () => {
    render(
      <CardContent>
        <Text>Body content</Text>
      </CardContent>
    );
    expect(screen.getByText("Body content")).toBeTruthy();
  });

  it("forwards ref", () => {
    const ref = createRef<View>();
    render(
      <CardContent ref={ref}>
        <Text>Body</Text>
      </CardContent>
    );
    expect(ref.current).toBeTruthy();
  });
});

describe("CardFooter", () => {
  it("renders with children", () => {
    render(
      <CardFooter>
        <Text>Footer content</Text>
      </CardFooter>
    );
    expect(screen.getByText("Footer content")).toBeTruthy();
  });

  it("forwards ref", () => {
    const ref = createRef<View>();
    render(
      <CardFooter ref={ref}>
        <Text>Footer</Text>
      </CardFooter>
    );
    expect(ref.current).toBeTruthy();
  });
});

describe("Card composition", () => {
  it("renders all sub-components together", () => {
    render(
      <Card testID="card">
        <CardHeader>
          <CardTitle>My Card</CardTitle>
          <CardDescription>A description</CardDescription>
        </CardHeader>
        <CardContent>
          <Text>Main content here</Text>
        </CardContent>
        <CardFooter>
          <Text>Footer actions</Text>
        </CardFooter>
      </Card>
    );

    expect(screen.getByTestId("card")).toBeTruthy();
    expect(screen.getByText("My Card")).toBeTruthy();
    expect(screen.getByText("A description")).toBeTruthy();
    expect(screen.getByText("Main content here")).toBeTruthy();
    expect(screen.getByText("Footer actions")).toBeTruthy();
  });
});
