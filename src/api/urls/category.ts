interface IGetCategory {
  getAllCategory: string;
  deleteCategory: (id: number) => string;
}

export const getCategoryUrl: IGetCategory = {
  getAllCategory: "categories",
  deleteCategory: (id: number) => {
    return `categories/${id}`;
  },
};
