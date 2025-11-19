import api from "@/services/api-request";
import { getUserUrl } from "../urls/user";

interface IGetUsersFn {
  getAllUsers: () => Promise<IGetUsersFn>;
}

export const getUsersFn: IGetUsersFn = {
  getAllUsers: async () => {
    const url = getUserUrl.getAllUser;

    const response = await api.get(url);

    return response.data;
  },
};
