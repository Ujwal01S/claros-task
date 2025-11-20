import { useDeleteCategory } from "@/api/hooks/category/use-delete-category";
import { useGetCategory } from "@/api/hooks/category/use-get-category";
import CategoryGridView from "@/components/commons/category-grid-view";
import DeleteDialog from "@/components/commons/delete-dailog";
import QueryToolTip from "@/components/commons/query-tooltip";
import TabSwitchWrapper from "@/components/commons/tab-wrapper";
import CategoryTable from "@/components/data/category-table";
import { TabsContent } from "@/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { closeDeleteDialog } from "@/store/slices/delete-slice";

const CategoryPage = () => {
  const { categoryData, isPending } = useGetCategory();
  const tableData = Array.isArray(categoryData) ? categoryData : [];
  const { open, id } = useAppSelector((state) => state.deleteDialog);
  const { mutate, isPending: deletePending } = useDeleteCategory();
  const dispatch = useAppDispatch();
  const handleCloseDialog = () => {
    dispatch(closeDeleteDialog());
  };

  const handleConfirmDelete = async () => {
    mutate(Number(id));
  };
  return (
    <section className="grid gap-3 flex-1">
      <header>
        <h3>Categories</h3>
      </header>
      <div className="flex gap-2 items-center">
        <p className="text-xs text-gray-500 py-1">
          Api filter option unavailable filter through tanstack table
        </p>
        <QueryToolTip />
      </div>
      <TabSwitchWrapper defaultValue="table">
        <TabsContent value="table">
          <CategoryTable
            categoryData={tableData}
            isPending={isPending}
          />
        </TabsContent>

        <TabsContent value="grid">
          <CategoryGridView
            data={tableData}
            isPending={isPending}
          />
        </TabsContent>
      </TabSwitchWrapper>

      <DeleteDialog
        open={open}
        onChange={handleCloseDialog}
        onDelete={handleConfirmDelete}
        loading={deletePending}
      />
    </section>
  );
};

export default CategoryPage;
