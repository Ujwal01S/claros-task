import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { ICategory } from "@/types/category.types";
import { type IProduct } from "@/types/product.types";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Trash2Icon } from "lucide-react";
import { useMemo } from "react";
import { useAppDispatch } from "../use-redux";
import { openDeleteDialog } from "@/store/slices/delete-slice";

export const useProductColumn = () => {
  const dispatch = useAppDispatch();

  const columns = useMemo<ColumnDef<IProduct>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected()
                ? true
                : table.getIsSomePageRowsSelected()
                  ? "indeterminate"
                  : false
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
      },
      {
        accessorKey: "title",
        header: "Product Name",
        cell: ({ row }) => {
          const title = row.getValue("title") as string;
          return <p className="text-sm">{title.slice(0, 24)}...</p>;
        },
      },

      {
        accessorKey: "price",
        header: ({ column }) => {
          return (
            <Button
              variant={"ghost"}
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Price
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const price = row.getValue("price") as number;
          return <p>${price}</p>;
        },
      },
      {
        accessorKey: "images",
        header: "Image",
        cell: ({ row }) => {
          const images = row.getValue("images") as string[];
          const singleImage = images[0] as string;
          return (
            <figure>
              <img
                src={singleImage}
                className="w-8 h-8 rounded-sm"
              />
            </figure>
          );
        },
      },
      {
        header: "Category",
        accessorKey: "category",
        cell: ({ cell }) => {
          const categoryData = cell.getValue() as ICategory;
          const categoryName = categoryData.name;
          return <p>{categoryName}</p>;
        },
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const productId = row.original.id;
          return (
            <button onClick={() => dispatch(openDeleteDialog(productId))}>
              <Trash2Icon className="text-red-500" />
            </button>
          );
        },
      },
    ],
    [dispatch],
  );

  return columns;
};
