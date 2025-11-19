import { useGetAllProducts } from "@/api/hooks/product/use-get-all";
import StatusCard from "@/components/commons/status-card";
import ProductTable from "@/components/data/product-table";
import { LayoutGrid, Package, Users2 } from "lucide-react";
import DeleteDialog from "@/components/commons/delete-dailog";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { useDeleteProduct } from "@/api/hooks/product/use-delete";
import { closeDeleteDialog } from "@/store/slices/delete-slice";
import { useGetCategory } from "@/api/hooks/category/use-get-category";

const HomePage = () => {
  // get all product api
  const { data: productData, isPending: productIsPending } =
    useGetAllProducts();

  const { categoryData, isPending } = useGetCategory();

  const { open, id } = useAppSelector((state) => state.deleteDialog);
  const dispatch = useAppDispatch();

  const { isPending: deleteIsPending, mutate } = useDeleteProduct();

  const handleCloseDialog = () => {
    dispatch(closeDeleteDialog());
  };

  const handleConfirmDelete = async () => {
    mutate(Number(id));
  };

  return (
    <section className="flex flex-col gap-6">
      <header>
        <h3>Dashboard</h3>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
        <StatusCard
          title="Products"
          icon={<Package className="w-8 h-8 md:w-10 md:h-10" />}
          total={!productIsPending ? (productData?.length ?? 0) : 0}
          className="border-l-product"
          isPending={productIsPending}
        />
        <StatusCard
          title="Categories"
          icon={<Users2 className="w-8 h-8 md:w-10 md:h-10" />}
          total={!isPending ? (categoryData?.length ?? 0) : 0}
          className="border-l-user"
          isPending={isPending}
        />
        <StatusCard
          title="Users"
          icon={<LayoutGrid className="w-8 h-8 md:w-10 md:h-10" />}
          total={329}
          className="border-l-category"
          isPending={false}
        />
      </div>
      <h5>Product Data Table</h5>
      <ProductTable dataLength={productData?.length ?? 0} />

      <DeleteDialog
        open={open}
        onChange={handleCloseDialog}
        onDelete={handleConfirmDelete}
        loading={deleteIsPending}
      />
    </section>
  );
};

export default HomePage;
