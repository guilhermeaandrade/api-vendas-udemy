import { IUser } from "@modules/users/domain/models/IUser";

export interface IMail {
  sendResetPassword(token: string, user: IUser): Promise<void>;
  sendWelcome(user: IUser): Promise<void>;
}
