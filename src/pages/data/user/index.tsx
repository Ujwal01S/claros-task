import { useGetAllUser } from "@/api/hooks/user/use-get-user";
import TabSwitchWrapper from "@/components/commons/tab-wrapper";
import UserGridView from "@/components/commons/user-grid-view";
import UserTable from "@/components/data/user-table";
import { TabsContent } from "@radix-ui/react-tabs";
import DeleteDialog from "@/components/commons/delete-dailog";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { closeDeleteDialog } from "@/store/slices/delete-slice";
import { useDeleteUser } from "@/api/hooks/user/use-delete-user";
import QueryToolTip from "@/components/commons/query-tooltip";

const UsersPage = () => {
  const { userData, userPending } = useGetAllUser();
  const userDataFallback = Array.isArray(userData) ? userData : [];
  const { open, id } = useAppSelector((state) => state.deleteDialog);
  const dispatch = useAppDispatch();
  const { mutate, isPending } = useDeleteUser();

  const handleCloseDialog = () => {
    dispatch(closeDeleteDialog());
  };

  const handleConfirmDelete = async () => {
    mutate(Number(id));
  };

  return (
    <section className="grid gap-3 flex-1">
      <header>
        <h3>Users</h3>
      </header>

      <div className="flex gap-2 items-center">
        <p className="text-xs text-gray-500 py-1">
          Api filter option unavailable filter through tanstack table
        </p>
        <QueryToolTip />
      </div>

      <TabSwitchWrapper defaultValue="table">
        <TabsContent value="table">
          <UserTable
            userData={userDataFallback}
            isPending={userPending}
          />
        </TabsContent>

        <TabsContent value="grid">
          <UserGridView
            data={userDataFallback}
            isPending={userPending}
          />
        </TabsContent>
      </TabSwitchWrapper>

      <DeleteDialog
        open={open}
        onChange={handleCloseDialog}
        onDelete={handleConfirmDelete}
        loading={isPending}
      />
    </section>
  );
};

export default UsersPage;
