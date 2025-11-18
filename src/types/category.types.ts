export interface ICategory {
  id: number;
  name: string;
  image: string;
  slug: string;
}

export type IGetCateoryResponse = ICategory[];
