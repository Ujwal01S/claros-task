import TableSearchColumn from "@/components/data-table/filter-column";
import DataTableRender from "@/components/data-table/render-row";
import TablePagination from "@/components/data-table/table-pagination";
import TableFilterColumn from "@/components/data-table/view-options";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useUserColumn } from "@/hooks/table-columns/use-user-column";
import type { IGetUsersResponse } from "@/types/user.types";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import { TriangleAlert } from "lucide-react";
import { useState } from "react";

const UserTable = ({
  userData,
  isPending,
}: {
  userData: IGetUsersResponse;
  isPending: boolean;
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [pagination, setPagination] = useState({
    pageIndex: 0, // initial page index
    pageSize: 8,
  });

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  // get column from hook
  const columns = useUserColumn();

  const table = useReactTable({
    data: userData,
    columns,

    // sorting
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    // filters
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),

    // pagination
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,

    getCoreRowModel: getCoreRowModel(),

    // visibility
    onColumnVisibilityChange: setColumnVisibility,

    // row selection
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },

    rowCount: userData.length,
  });

  return (
    <Card className="py-2">
      <CardHeader className="sr-only">User Table</CardHeader>

      <div className="grid md:flex md:flex-row mx-2 items-center md:justify-between gap-2">
        <div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            <TableSearchColumn
              columnName="name"
              table={table}
            />

            <TableSearchColumn
              columnName="email"
              table={table}
            />
          </div>
        </div>
        <TableFilterColumn table={table} />
      </div>

      <CardContent>
        {isPending ? (
          <div className="w-full flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <DataTableRender
            columns={columns}
            table={table}
          />
        )}
        {/* fallback when all the column are hidden */}

        {!table.getIsSomeColumnsVisible() && (
          <div className="w-full flex items-center justify-center gap-2">
            <div>
              <TriangleAlert
                color="red"
                size={24}
              />
            </div>
            <p className="font-semibold">
              All Column Visibility are off turn any Column Visibility{" "}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between px-2">
        {table.getIsSomeColumnsVisible() && (
          <>
            <p className="text-sm text-gray-500">
              Showing {pagination.pageIndex * pagination.pageSize + 1} to{" "}
              {Math.min(
                (pagination.pageIndex + 1) * pagination.pageSize,
                userData.length,
              )}{" "}
              of {userData.length} users
            </p>
            <TablePagination table={table} />
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default UserTable;
