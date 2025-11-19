import { getUsersFn } from "@/api/functions/users";
import { userQueryKey } from "@/constants/query-key.constant";
import type { IGetUsersResponse } from "@/types/user.types";
import { useQuery } from "@tanstack/react-query";

export const useGetAllUser = () => {
  const { data: userData, isPending: userPending } = useQuery<
    IGetUsersResponse,
    string
  >({
    queryKey: [userQueryKey.GET_ALL_USER],
    queryFn: () => {
      return getUsersFn.getAllUsers();
    },
  });

  return { userData, userPending };
};
