export interface IUserToken {
  id: string;
  token: string;
  userId: string;
  isUsed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
