import type { IGetCateoryResponse } from "@/types/category.types";
import CustomCard from "../custom-card";
import CardSkeletion from "../card-skeletion";

interface Props {
  data: IGetCateoryResponse;
  isPending: boolean;
}
const CategoryGridView = ({ data, isPending }: Props) => {
  return (
    <>
      {isPending ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <CardSkeletion key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 ">
          {data?.length === 0 ? (
            <p>No Result Found</p>
          ) : (
            <>
              {data?.map((product) => (
                <CustomCard
                  key={product.id}
                  id={product.id}
                  imageUrl={product.image}
                  name={product.name}
                />
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default CategoryGridView;
