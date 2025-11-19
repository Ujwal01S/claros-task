import { useGetAllProducts } from "@/api/hooks/product/use-get-all";
import PaginationButton from "@/components/commons/pagination-button";
import DataTableRender from "@/components/data-table/render-row";
import TableFilterColumn from "@/components/data-table/view-options";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { usePaginationPrams } from "@/hooks/query-params/use-pagination";
import { useSearchProductParams } from "@/hooks/query-params/use-search-product";
import { useProductColumn } from "@/hooks/table-columns/use-product-column";
import { useDebounce } from "@/hooks/use-debounce";
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
import React, { useState } from "react";

const DataProductPage = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { limit, offSet } = usePaginationPrams();

  const {
    searchWithPrice,
    searchWithTitle,
    setSearchWithPrice,
    setSearchWithTitle,
  } = useSearchProductParams();

  const debouncedTitle = useDebounce(searchWithTitle, 1000);
  const debouncedPrice = useDebounce(searchWithPrice, 1000);

  const { data, isFetching } = useGetAllProducts({
    limit,
    offset: offSet,
    price: Number(debouncedPrice),
    title: debouncedTitle,
  });

  const [pagination, setPagination] = useState({
    pageIndex: 0, // initial page index
    pageSize: 8,
  });

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  // get column from hook
  const columns = useProductColumn();

  const tableData = Array.isArray(data) ? data : [];

  const table = useReactTable({
    data: tableData,
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

    rowCount: 8,
  });

  return (
    <section className="grid gap-3 md:gap-6 flex-1">
      <header>
        <h3>Product Data Table</h3>
      </header>

      <Card className="py-2">
        <CardHeader className="sr-only">Header</CardHeader>

        <div className="flex flex-col md:flex-row justify-between gap-2 w-full px-2 items-center">
          <div>
            <p className="text-xs text-gray-500 py-1">
              Api filter option available
            </p>
            <div className="flex flex-col md:flex-row gap-2 md:gap-4">
              <Input
                placeholder="search product with title..."
                value={searchWithTitle}
                onChange={(e) => setSearchWithTitle(e.target.value)}
              />
              <Input
                placeholder="search product with price.."
                type="number"
                value={searchWithPrice}
                onChange={(e) => setSearchWithPrice(e.target.value)}
                className="min-w-50"
              />
            </div>
          </div>
          <TableFilterColumn table={table} />
        </div>

        <CardContent>
          <DataTableRender
            columns={columns}
            table={table}
          />
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
        <CardFooter className="place-self-end px-2">
          {table.getIsSomeColumnsVisible() && (
            <PaginationButton isFetching={isFetching} />
          )}
        </CardFooter>
      </Card>
    </section>
  );
};

export default DataProductPage;
