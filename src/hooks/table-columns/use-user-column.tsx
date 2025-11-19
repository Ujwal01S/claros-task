import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { openDeleteDialog } from "@/store/slices/delete-slice";
import type { IUser } from "@/types/user.types";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Trash2Icon } from "lucide-react";
import { useMemo } from "react";
import { useAppDispatch } from "../use-redux";

export const useUserColumn = () => {
  const dispatch = useAppDispatch();

  const columns = useMemo<ColumnDef<IUser>[]>(
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
        accessorKey: "name",
        header: "User Name",
        cell: ({ row }) => {
          const name = row.getValue("name") as string;
          return <p className="text-sm">{name}</p>;
        },
      },

      {
        id: "email",
        accessorKey: "email",
        header: ({ column }) => {
          return (
            <Button
              variant={"ghost"}
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Email
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const email = row.getValue("email") as string;
          return <p>{email}</p>;
        },
      },
      {
        id: "avatar",
        accessorKey: "avatar",
        header: "Avatar",
        cell: ({ row }) => {
          const image = row.getValue("avatar") as string; // Changed from "avater"
          return (
            <figure>
              <img
                src={image}
                alt="user avatar"
                className="w-8 h-8 rounded-sm object-cover"
              />
            </figure>
          );
        },
      },
      {
        header: "Role",
        accessorKey: "role",
        cell: ({ row }) => {
          const role = row.getValue("role") as "customer" | "admin";
          return <p>{role}</p>;
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
