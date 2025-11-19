import type { IGetCateoryResponse } from "@/types/category.types";
import { getCategoryUrl } from "../urls/category";
import api from "@/services/api-request";

interface IGetCategoryFn {
  getAllCategory: () => Promise<IGetCateoryResponse>;

  deleteCategory: (id: number) => Promise<boolean>;
}

export const getCategoryFn: IGetCategoryFn = {
  getAllCategory: async () => {
    const url = getCategoryUrl.getAllCategory;

    const response = await api.get(url);

    return response.data;
  },
  deleteCategory: async (id: number) => {
    const url = getCategoryUrl.deleteCategory(id);

    const response = await api.delete(url);

    return response.data;
  },
};
