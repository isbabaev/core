export interface ICreateAccount {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IAccount {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  products: any;
  createdAt: Date;
  updatedAt: Date;
}
