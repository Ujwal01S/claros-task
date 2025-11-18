import api from "@/services/api-request";
import { getProductUrl, type IGetProductOptions } from "../urls/products";
import type { IGetProductsResponse } from "@/types/product.types";

interface IGetProductProps {
  getAllProducts: (
    options?: IGetProductOptions,
  ) => Promise<IGetProductsResponse>;

  deleteProduct: (id: number) => Promise<boolean>;
}

export const getProductFn: IGetProductProps = {
  getAllProducts: async (options?: IGetProductOptions) => {
    const url = getProductUrl.getAllProduct(options);

    const response = await api.get(url);

    return response.data;
  },

  deleteProduct: async (id: number) => {
    const url = getProductUrl.deleteProduct(id);

    console.log({ url });

    const response = await api.delete(url);

    return response.data;
  },
};
