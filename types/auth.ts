import { Permission } from "./enum";

export interface IAuthPermission {
  [key: string]: Permission;
}

export interface IVerifyUserResponse {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
  hd: string;
}

