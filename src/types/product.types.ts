import type { ICategory } from "./category.types";

export interface IProduct {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: ICategory;
  images: string[];
}

export type IGetProductsResponse = IProduct[];
