import { type Table as TableType } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "../ui/button";

interface Props<TData> {
  table: TableType<TData>;
}

const TablePagination = <TData,>({ table }: Props<TData>) => {
  const showPagination = table.getIsSomeColumnsVisible();

  return (
    <>
      {showPagination ? (
        <div className="flex items-center">
          <Button
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
            variant="ghost"
          >
            <ChevronsLeft />
          </Button>
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            variant="ghost"
          >
            <ChevronLeft />
          </Button>
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            variant="ghost"
          >
            <ChevronRight />
          </Button>
          <Button
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
            variant="ghost"
          >
            <ChevronsRight />
          </Button>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[6, 10, 15, 20, 40].map((pageSize) => (
              <option
                key={pageSize}
                value={pageSize}
              >
                {pageSize}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default TablePagination;
