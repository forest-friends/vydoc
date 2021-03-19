import Table from "cli-table";

interface TableOptions {
  chars: Partial<
    Record<
      | "top"
      | "top-mid"
      | "top-left"
      | "top-right"
      | "bottom"
      | "bottom-mid"
      | "bottom-left"
      | "bottom-right"
      | "left"
      | "left-mid"
      | "mid"
      | "mid-mid"
      | "right"
      | "right-mid"
      | "middle",
      string
    >
  >;
  truncate: string;
  colors: boolean;
  colWidths: number[];
  colAligns: Array<"left" | "middle" | "right">;
  style: Partial<{
    "padding-left": number;
    "padding-right": number;
    head: string[];
    border: string[];
    compact: boolean;
  }>;
  head: string[];
}

export const makeTable = (options?: Partial<TableOptions>) => (
  values: any[]
): string => {
  const table = new Table(options);
  table.push(...values);
  return table.toString();
};
