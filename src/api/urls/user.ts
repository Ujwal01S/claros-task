interface IGetUserUrl {
  getAllUser: string;

  deleteUser: (id: number) => string;
}

export const getUserUrl: IGetUserUrl = {
  deleteUser: (id: number) => {
    return `users/${id}`;
  },
  getAllUser: "users",
};
