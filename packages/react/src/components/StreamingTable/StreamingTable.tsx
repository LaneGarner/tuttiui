import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@tutti-ui/shared";

export interface StreamingColumn {
  key: string;
  header: string;
  width?: string;
}

export interface StreamingRow {
  id: string;
  cells: Record<string, string | number | null>;
  status?: "pending" | "streaming" | "complete";
}

export interface StreamingTableProps extends HTMLAttributes<HTMLDivElement> {
  columns: StreamingColumn[];
  rows: StreamingRow[];
  isLoading?: boolean;
  loadingRows?: number;
}

export const StreamingTable = forwardRef<HTMLDivElement, StreamingTableProps>(
  ({ columns, rows, isLoading = false, loadingRows = 3, className, ...props }, ref) => {
    const renderSkeletonRows = (count: number) =>
      Array.from({ length: count }, (_, i) => (
        <tr key={`skeleton-${i}`}>
          {columns.map((col) => (
            <td key={col.key} className="px-4 py-3">
              <div className="h-4 w-20 rounded bg-tt-surface-3 animate-pulse" />
            </td>
          ))}
        </tr>
      ));

    const renderCell = (row: StreamingRow, col: StreamingColumn) => {
      const value = row.cells[col.key];

      if (row.status === "streaming" && value == null) {
        return <div className="h-4 w-20 rounded bg-tt-surface-3 animate-pulse" />;
      }

      return value ?? "";
    };

    const getRowClassName = (row: StreamingRow) => {
      if (row.status === "pending") return "opacity-50";
      return "";
    };

    return (
      <div
        ref={ref}
        className={cn("overflow-auto rounded-lg border border-tt-border text-tt-fg", className)}
        {...props}
      >
        <table className="w-full text-sm">
          <thead className="bg-tt-canvas border-b border-tt-border">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-left text-xs font-medium text-tt-fg-subtle uppercase tracking-wider"
                  style={col.width ? { width: col.width } : undefined}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-tt-border">
            {isLoading && rows.length === 0 && renderSkeletonRows(loadingRows)}
            {!isLoading && rows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-tt-fg-faint"
                >
                  No data
                </td>
              </tr>
            )}
            {rows.map((row) => (
              <tr key={row.id} className={getRowClassName(row)}>
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3">
                    {renderCell(row, col)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);

StreamingTable.displayName = "StreamingTable";
