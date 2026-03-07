import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { StreamingTable, type StreamingColumn, type StreamingRow } from "./StreamingTable";

const columns: StreamingColumn[] = [
  { key: "name", header: "Name" },
  { key: "status", header: "Status" },
  { key: "value", header: "Value" },
];

const completeRows: StreamingRow[] = [
  { id: "1", cells: { name: "Alice", status: "Active", value: 100 }, status: "complete" },
  { id: "2", cells: { name: "Bob", status: "Inactive", value: 200 }, status: "complete" },
];

describe("StreamingTable", () => {
  it("renders table with headers and rows", () => {
    render(<StreamingTable columns={columns} rows={completeRows} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Value")).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(3); // 1 header + 2 data rows
  });

  it("renders cell values", () => {
    render(<StreamingTable columns={columns} rows={completeRows} />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("200")).toBeInTheDocument();
  });

  it("pending row has opacity class", () => {
    const pendingRows: StreamingRow[] = [
      { id: "1", cells: { name: "Alice", status: "Pending", value: 50 }, status: "pending" },
    ];
    render(<StreamingTable columns={columns} rows={pendingRows} />);
    const dataRows = screen.getAllByRole("row");
    // dataRows[0] is header, dataRows[1] is the pending row
    expect(dataRows[1]).toHaveClass("opacity-50");
  });

  it("streaming row with null cell shows skeleton", () => {
    const streamingRows: StreamingRow[] = [
      { id: "1", cells: { name: "Alice", status: null, value: null }, status: "streaming" },
    ];
    const { container } = render(
      <StreamingTable columns={columns} rows={streamingRows} />
    );
    const skeletons = container.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBe(2); // status and value are null
  });

  it("complete row renders normally", () => {
    render(<StreamingTable columns={columns} rows={completeRows} />);
    const dataRows = screen.getAllByRole("row");
    expect(dataRows[1]).not.toHaveClass("opacity-50");
    expect(screen.getByText("Alice")).toBeInTheDocument();
  });

  it("loading state shows skeleton rows", () => {
    const { container } = render(
      <StreamingTable columns={columns} rows={[]} isLoading loadingRows={5} />
    );
    const skeletons = container.querySelectorAll(".animate-pulse");
    // 5 rows * 3 columns = 15 skeleton divs
    expect(skeletons.length).toBe(15);
  });

  it("empty state shows No data", () => {
    render(<StreamingTable columns={columns} rows={[]} />);
    expect(screen.getByText("No data")).toBeInTheDocument();
  });

  it("column widths applied", () => {
    const columnsWithWidth: StreamingColumn[] = [
      { key: "name", header: "Name", width: "200px" },
      { key: "status", header: "Status" },
    ];
    const rows: StreamingRow[] = [
      { id: "1", cells: { name: "Alice", status: "OK" }, status: "complete" },
    ];
    render(<StreamingTable columns={columnsWithWidth} rows={rows} />);
    const th = screen.getByText("Name").closest("th");
    expect(th).toHaveStyle({ width: "200px" });
  });

  it("forwards ref", () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement | null>;
    render(<StreamingTable ref={ref} columns={columns} rows={[]} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("applies custom className", () => {
    const { container } = render(
      <StreamingTable columns={columns} rows={[]} className="my-custom-class" />
    );
    expect(container.firstChild).toHaveClass("my-custom-class");
  });
});
