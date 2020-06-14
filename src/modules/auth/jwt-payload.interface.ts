import { RoleType } from '../role/roletype.enum';

export interface IJwPayload {
  id: number;
  username: string;
  email: string;
  roles: RoleType[];
  //Expiration time (optional)
  iat?: Date;
}
