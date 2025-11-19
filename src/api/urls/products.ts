import { buildQueryParams } from "@/utils/query-params-builder";

interface IProductUrlProps {
  getAllProduct: (options?: IGetProductOptions) => string;

  deleteProduct: (id: number) => string;
}

export interface IGetProductOptions {
  offset?: number;
  limit?: number;
  title?: string;
  price?: number;
  [key: string]: string | number | null | undefined;
}

export const getProductUrl: IProductUrlProps = {
  getAllProduct: (options?: IGetProductOptions) => {
    const queryParams = buildQueryParams(options ?? {});
    const url = `products${queryParams}`;
    return url;
  },

  deleteProduct: (id: number) => {
    return `products/${id}`;
  },
};
