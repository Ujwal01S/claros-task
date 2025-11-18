import { getProductFn } from "@/api/functions/products";
import { productQueryKey } from "@/constants/query-key.constant";
import type { IGetProductsResponse } from "@/types/product.types";
import { useQuery } from "@tanstack/react-query";

export const useGetAllProducts = () => {
  const { data, isPending } = useQuery<IGetProductsResponse, string>({
    queryFn: async () => {
      return getProductFn.getAllProducts();
    },
    queryKey: [productQueryKey],
  });

  return { data, isPending };
};
