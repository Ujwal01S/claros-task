import { useDeleteProduct } from "@/api/hooks/product/use-delete";
import { useGetAllProducts } from "@/api/hooks/product/use-get-all";
import CardSkeletion from "@/components/commons/card-skeletion";
import CustomCard from "@/components/commons/custom-card";
import DeleteDialog from "@/components/commons/delete-dailog";
import PaginationButton from "@/components/commons/pagination-button";
import { Input } from "@/components/ui/input";
import { usePaginationPrams } from "@/hooks/query-params/use-pagination";
import { useSearchProductParams } from "@/hooks/query-params/use-search-product";
import { useDebounce } from "@/hooks/use-debounce";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { closeDeleteDialog } from "@/store/slices/delete-slice";

const AllProductsPage = () => {
  // state for dialog
  const { open, id } = useAppSelector((state) => state.deleteDialog);
  const dispatch = useAppDispatch();

  // query params from custom hook and nuqs
  const { limit, offSet } = usePaginationPrams();
  const {
    searchWithPrice,
    searchWithTitle,
    setSearchWithPrice,
    setSearchWithTitle,
  } = useSearchProductParams();

  // Debounce search values for 1sec
  const debouncedTitle = useDebounce(searchWithTitle, 500);
  const debouncedPrice = useDebounce(searchWithPrice, 500);

  // react query hooks
  const { data, isPending } = useGetAllProducts({
    limit,
    offset: offSet,
    price: Number(debouncedPrice),
    title: debouncedTitle,
  });
  const { isPending: deleteIsPending, mutate } = useDeleteProduct();

  const handleCloseDialog = () => {
    dispatch(closeDeleteDialog());
  };

  const handleConfirmDelete = async () => {
    mutate(Number(id));
  };

  return (
    <section className="grid gap-3 md:gap-6 flex-1">
      <div className="flex justify-between">
        <header>
          <h3>All Products</h3>
        </header>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <h4 className="text-nowrap">Search Product</h4>
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
        />
      </div>

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
                  imageUrl={product.images[0]}
                  name={product.title}
                  categoryName={product.category.name}
                  description={product.description}
                  price={product.price}
                  type="Product"
                  product={product}
                />
              ))}
            </>
          )}
        </div>
      )}

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
