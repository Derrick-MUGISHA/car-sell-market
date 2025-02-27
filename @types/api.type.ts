export type LoginType = {
  email: string;
  password: string;
};

export type RegisterType = {
  name: string;
  email: string;
  shopName: string;
  password: string;
};

export type User = {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type Post = {
  id: number;
  title: string;
}