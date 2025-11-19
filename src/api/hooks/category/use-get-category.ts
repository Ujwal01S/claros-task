import { getCategoryFn } from "@/api/functions/category";
import { productQueryKey } from "@/constants/query-key.constant";
import type { IGetCateoryResponse } from "@/types/category.types";
import { useQuery } from "@tanstack/react-query";

export const useGetCategory = () => {
  const {
    data: categoryData,
    isPending,
    isFetching,
  } = useQuery<IGetCateoryResponse, string>({
    queryFn: () => {
      return getCategoryFn.getAllCategory();
    },
    queryKey: [productQueryKey.GET_ALL_PRODUCTS],
  });

  return { categoryData, isPending, isFetching };
};
