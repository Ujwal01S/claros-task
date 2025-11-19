import { useGetCategory } from "@/api/hooks/category/use-get-category";
import CategoryGridView from "@/components/commons/category-grid-view";
import TabSwitchWrapper from "@/components/commons/tab-wrapper";
import CategoryTable from "@/components/data/category-table";
import { TabsContent } from "@/components/ui/tabs";

const CategoryPage = () => {
  const { categoryData, isPending, isFetching } = useGetCategory();
  const tableData = Array.isArray(categoryData) ? categoryData : [];

  return (
    <section className="grid gap-3  flex-1">
      <header>
        <h3>Categories</h3>
      </header>

      <TabSwitchWrapper defaultValue="table">
        <TabsContent value="table">
          <CategoryTable
            categoryData={tableData}
            isFetching={isFetching}
          />
        </TabsContent>

        <TabsContent value="grid">
          <CategoryGridView
            data={tableData}
            isPending={isPending}
          />
        </TabsContent>
      </TabSwitchWrapper>
    </section>
  );
};

export default CategoryPage;
