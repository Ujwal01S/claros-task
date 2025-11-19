import { getProductFn } from "@/api/functions/products";
import type { IGetProductOptions } from "@/api/urls/products";
import { productQueryKey } from "@/constants/query-key.constant";
import type { IGetProductsResponse } from "@/types/product.types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetAllProducts = (options?: IGetProductOptions) => {
  const { data, isPending, isFetching } = useQuery<
    IGetProductsResponse,
    string
  >({
    queryFn: async () => {
      return getProductFn.getAllProducts(options);
    },
    queryKey: [
      productQueryKey.GET_ALL_PRODUCTS,
      options?.limit,
      options?.offset,
      options?.price,
      options?.title,
    ],
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    staleTime: 5_000,
  });

  return { data, isPending, isFetching };
};
