import CustomCard from "@/components/commons/product-card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const AllProductsPage = () => {
  return (
    <section className="grid gap-6 flex-1">
      <div className="flex justify-between">
        <header>
          <h3>All Products</h3>
        </header>

        <Button>Add Product</Button>
      </div>
      <ScrollArea className="h-[calc(100vh-28vh)]  rounded-md  w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
          <CustomCard />
          <CustomCard />
          <CustomCard />
          <CustomCard />
          <CustomCard />
          <CustomCard />
          <CustomCard />
          <CustomCard />
        </div>
      </ScrollArea>
    </section>
  );
};

export default AllProductsPage;
