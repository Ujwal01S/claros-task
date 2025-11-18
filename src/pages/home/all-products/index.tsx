import { useGetAllProducts } from "@/api/hooks/product/use-get-all";
import DeleteDialog from "@/components/commons/delete-dailog";
import PaginationButton from "@/components/commons/pagination-button";
import CustomCard from "@/components/commons/custom-card";
import { Button } from "@/components/ui/button";
import { usePaginationPrams } from "@/hooks/query-params/use-pagination";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { closeDeleteDialog } from "@/store/slices/delete-slice";
import CardSkeletion from "@/components/commons/card-skeletion";
import { useDeleteProduct } from "@/api/hooks/product/use-delete";

const AllProductsPage = () => {
  // getting the values from delete-slice store and dispatch from hook
  const { open, id } = useAppSelector((state) => state.deleteDialog);
  const dispatch = useAppDispatch();

  const { limit, offSet } = usePaginationPrams();

  // get products hook
  const { data, isPending } = useGetAllProducts({ limit, offset: offSet });

  // delete product hook
  const { isPending: deleteIsPending, mutate } = useDeleteProduct();
  const handleCloseDialog = () => {
    dispatch(closeDeleteDialog());
  };

  const handleConfirmDelete = async () => {
    mutate(id as number);
    dispatch(closeDeleteDialog());
  };

  return (
    <section className="grid gap-6 flex-1">
      <div className="flex justify-between">
        <header>
          <h3>All Products</h3>
        </header>

        <Button>Add Product</Button>
      </div>
      {isPending ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <CardSkeletion key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
          {data?.map((product) => (
            <CustomCard
              key={product.id}
              id={product.id}
              imageUrl={product.images[0]}
              name={product.title}
              categoryName={product.category.name}
              description={product.description}
              price={product.price}
              type="Product"
            />
          ))}
        </div>
      )}

      {/* handles pagination with logics */}
      <PaginationButton />

      <DeleteDialog
        open={open}
        onChange={handleCloseDialog}
        onDelete={handleConfirmDelete}
        loading={deleteIsPending}
      />
    </section>
  );
};

export default AllProductsPage;
