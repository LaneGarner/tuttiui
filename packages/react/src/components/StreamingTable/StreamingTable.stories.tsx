import type { Meta, StoryObj } from "@storybook/react";
import { StreamingTable, type StreamingColumn, type StreamingRow } from "./StreamingTable";

const columns: StreamingColumn[] = [
  { key: "id", header: "ID", width: "80px" },
  { key: "name", header: "Name", width: "200px" },
  { key: "email", header: "Email" },
  { key: "status", header: "Status", width: "120px" },
];

const meta: Meta<typeof StreamingTable> = {
  title: "AI/StreamingTable",
  component: StreamingTable,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StreamingTable>;

const completeRows: StreamingRow[] = [
  { id: "1", cells: { id: "1", name: "Alice Johnson", email: "alice@example.com", status: "Active" }, status: "complete" },
  { id: "2", cells: { id: "2", name: "Bob Smith", email: "bob@example.com", status: "Active" }, status: "complete" },
  { id: "3", cells: { id: "3", name: "Carol White", email: "carol@example.com", status: "Inactive" }, status: "complete" },
];

export const Default: Story = {
  args: {
    columns,
    rows: completeRows,
  },
};

export const WithStreamingRows: Story = {
  args: {
    columns,
    rows: [
      { id: "1", cells: { id: "1", name: "Alice Johnson", email: "alice@example.com", status: "Active" }, status: "complete" },
      { id: "2", cells: { id: "2", name: "Bob Smith", email: null, status: null }, status: "streaming" },
      { id: "3", cells: { id: "3", name: null, email: null, status: null }, status: "pending" },
    ],
  },
};

export const Loading: Story = {
  args: {
    columns,
    rows: [],
    isLoading: true,
    loadingRows: 5,
  },
};

export const Empty: Story = {
  args: {
    columns,
    rows: [],
  },
};
