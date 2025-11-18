import { useGetAllProducts } from "@/api/hooks/product/use-get-all";
import StatusCard from "@/components/commons/status-card";
import { LayoutGrid, Package, Users2 } from "lucide-react";

const HomePage = () => {
  // get all product api
  const { data: productData, isPending: productIsPending } =
    useGetAllProducts();

  return (
    <section className="flex flex-col gap-6">
      <header>
        <h3>Dashboard</h3>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
        <StatusCard
          title="Product"
          icon={<Package className="w-8 h-8 md:w-10 md:h-10" />}
          total={!productIsPending ? (productData?.length ?? 0) : 0}
          className="border-l-product"
          isPending={productIsPending}
        />
        <StatusCard
          title="User"
          icon={<Users2 className="w-8 h-8 md:w-10 md:h-10" />}
          total={329}
          className="border-l-user"
          isPending={false}
        />
        <StatusCard
          title="Category"
          icon={<LayoutGrid className="w-8 h-8 md:w-10 md:h-10" />}
          total={329}
          className="border-l-category"
          isPending={false}
        />
      </div>
    </section>
  );
};

export default HomePage;
