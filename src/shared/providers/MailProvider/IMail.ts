import { IUser } from "@modules/users/domain/models/IUser";

export interface ITemplateVariable {
  [key: string]: string | number;
}

export interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

export interface IMailContact {
  name: string;
  email: string;
}

export interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

export interface IMail {
  sendResetPassword(token: string, user: IUser): Promise<void>;
  sendWelcome(user: IUser): Promise<void>;
}
