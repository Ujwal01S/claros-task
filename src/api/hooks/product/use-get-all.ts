import { getProductFn } from "@/api/functions/products";
import type { IGetProductOptions } from "@/api/urls/products";
import { productQueryKey } from "@/constants/query-key.constant";
import type { IGetProductsResponse } from "@/types/product.types";
import { useQuery } from "@tanstack/react-query";

export const useGetAllProducts = (options?: IGetProductOptions) => {
  const { data, isPending } = useQuery<IGetProductsResponse, string>({
    queryFn: async () => {
      return getProductFn.getAllProducts(options);
    },
    queryKey: [
      productQueryKey.GET_ALL_PRODUCTS,
      options?.limit,
      options?.offset,
    ],
  });

  return { data, isPending };
};
