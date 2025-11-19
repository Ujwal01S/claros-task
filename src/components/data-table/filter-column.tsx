import { cn } from "@/lib/utils";
import { type Table as TableType } from "@tanstack/react-table";
import { Input } from "../ui/input";

interface Props<TData> {
  columnName: string;
  className?: string;
  table: TableType<TData>;
}

const TableSearchColumn = <TData,>({
  columnName,
  className,
  table,
}: Props<TData>) => {
  return (
    <div className={cn("", className)}>
      <Input
        placeholder={`Filter ${columnName}...`}
        value={(table.getColumn(columnName)?.getFilterValue() as string) ?? ""}
        onChange={(e) =>
          table.getColumn(columnName)?.setFilterValue(e.target.value)
        }
      />
    </div>
  );
};

export default TableSearchColumn;
