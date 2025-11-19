import type { IGetCateoryResponse } from "@/types/category.types";
import { getCategoryUrl } from "../urls/category";
import api from "@/services/api-request";

interface IGetCategoryFn {
  getAllCategory: () => Promise<IGetCateoryResponse>;
}

export const getCategoryFn: IGetCategoryFn = {
  getAllCategory: async () => {
    const url = getCategoryUrl.getAllCategory;

    const response = await api.get(url);

    return response.data;
  },
};
