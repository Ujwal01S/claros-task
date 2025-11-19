import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAppDispatch } from "@/hooks/use-redux";
import { openDeleteDialog } from "@/store/slices/delete-slice";
import { Trash2 } from "lucide-react";

interface Props {
  imageUrl: string;
  name: string;
  categoryName?: string;
  price?: number;
  description?: string;
  type?: "Product" | "Category" | "User";
  id: number;
}

const CustomCard = ({
  imageUrl,
  name,
  categoryName,
  description,
  price,
  type = "Category",
  id,
}: Props) => {
  const dispatch = useAppDispatch();

  const deleteHandler = () => {
    dispatch(openDeleteDialog(id));
  };

  return (
    <Card className="group overflow-hidden relative py-0 hover:shadow-md">
      <CardHeader className="sr-only">header</CardHeader>

      {type !== "Category" && (
        <div className="grid gap-2 absolute z-20 right-3 top-3">
          <button
            className="w-fit bg-gray-200 hover:bg-gray-300 rounded-full p-1.5"
            onClick={deleteHandler}
          >
            <Trash2 size={18} />
          </button>
        </div>
      )}
      <CardContent className="px-0">
        <figure className="overflow-hidden">
          <img
            src={imageUrl}
            alt="card-id"
            className="aspect-video w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-out"
          />
        </figure>

        <div className="px-3 py-2 border-t">
          {type === "Category" && (
            <p className="text-lg font-bold">Category Id : {id}</p>
          )}
          <p className="text-lg font-semibold">{name}</p>
          {type === "Product" && (
            <>
              <p className="font-medium text-[14px]">{categoryName}</p>
              <p className="font-semibold">
                Price: <span>${price}</span>
              </p>
              <p className="line-clamp-3 text-sm">{description}</p>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
