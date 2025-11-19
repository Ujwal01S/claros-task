import api from "@/services/api-request";
import { getUserUrl } from "../urls/user";
import type { IGetUsersResponse } from "@/types/user.types";

interface IGetUsersFn {
  getAllUsers: () => Promise<IGetUsersResponse>;
  deleteUser: (id: number) => Promise<boolean>;
}

export const getUsersFn: IGetUsersFn = {
  getAllUsers: async () => {
    const url = getUserUrl.getAllUser;

    const response = await api.get(url);

    return response.data;
  },

  deleteUser: async (id: number) => {
    const url = getUserUrl.deleteUser(id);

    const response = await api.delete(url);

    return response.data;
  },
};
