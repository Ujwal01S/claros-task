import api from "@/services/api-request";
import { getProductUrl } from "../urls/products";
import type { IGetProductsResponse } from "@/types/product.types";

interface IGetProductProps {
  getAllProducts: () => Promise<IGetProductsResponse>;
}

export const getProductFn: IGetProductProps = {
  getAllProducts: async () => {
    const url = getProductUrl.getAllProduct;

    const response = await api.get(url);

    return response.data;
  },
};
