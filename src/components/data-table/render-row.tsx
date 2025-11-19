import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  type Table as TableType,
  type ColumnDef,
  flexRender,
} from "@tanstack/react-table";

export interface TableProps<TData, TValue> {
  table: TableType<TData>;
  columns: ColumnDef<TData, TValue>[];
}

export function EmptyTableRow({ colLength }: { colLength: number }) {
  return (
    <TableRow>
      <TableCell
        colSpan={colLength}
        className="h-24 text-center"
      >
        No results.
      </TableCell>
    </TableRow>
  );
}

const DataTableRender = <TData, TValue>({
  table,
  columns,
}: TableProps<TData, TValue>) => {
  return (
    <div>
      <div className="flex">
        <ScrollArea
          type="always"
          className="w-1 flex-1"
        >
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>

            {/* Table Body begins */}
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="border-gray-400"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <EmptyTableRow colLength={columns.length} />
              )}
            </TableBody>
          </Table>

          <ScrollBar
            orientation="horizontal"
            className="w-full"
          />
        </ScrollArea>
      </div>
    </div>
  );
};

export default DataTableRender;
