import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";

const CustomCard = () => {
  return (
    <Card className="group overflow-hidden relative">
      <CardHeader className="sr-only">header</CardHeader>

      <div className="grid gap-2 absolute z-20 right-3">
        <button className="w-fit bg-gray-200 hover:bg-gray-300 rounded-full p-1.5">
          <Pencil size={18} />
        </button>

        <button className="w-fit bg-gray-200 hover:bg-gray-300 rounded-full p-1.5">
          <Trash2 size={18} />
        </button>
      </div>
      <CardContent className="px-0">
        <div className="overflow-hidden">
          <img
            src="https://img.freepik.com/free-vector/vegetables-shopping-realistic-concept-with-shopping-cart-goods-vector-illustration_1284-16246.jpg?semt=ais_hybrid&w=740&q=80"
            alt="card-id"
            className="aspect-video w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-out"
          />
        </div>

        <div className="p-3 border-t">
          <p className="text-lg font-semibold">Product Name</p>
          <p className="font-medium text-[14px]">Category Name</p>
          <p>
            Price:<span className="font-semibold">$399</span>
          </p>
          <p className="line-clamp-3 text-sm">Product description</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
