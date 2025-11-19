import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { ICategory } from "@/types/category.types";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useMemo } from "react";

export const useCategoryColumn = () => {
  const columns = useMemo<ColumnDef<ICategory>[]>(
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
        id: "id",
        accessorKey: "id",
        header: ({ column }) => {
          return (
            <Button
              variant={"ghost"}
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Category Id
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const title = row.getValue("id") as string;
          return <p className="text-sm">{title}</p>;
        },
      },
      {
        id: "name",
        accessorKey: "name",
        header: "Category Name",
        cell: ({ row }) => {
          const title = row.getValue("name") as string;
          return <p className="text-sm">{title}</p>;
        },
      },

      {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => {
          const image = row.getValue("image") as string;

          return (
            <figure>
              <img
                src={image}
                className="w-8 h-8 rounded-sm"
              />
            </figure>
          );
        },
      },
    ],
    [],
  );

  return columns;
};
