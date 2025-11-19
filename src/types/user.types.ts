export interface IUser {
  id: number;
  email: string;
  password: string;
  name: string;
  role: "customer" | "admin";
  avatar: string;
}

export type IGetUsersResponse = IUser[];
