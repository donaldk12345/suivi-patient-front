import { Role } from "./role.enum";


export class User {
  id: number |undefined;
  username: string = "";
  password: string = "";
  role: Role = Role.USER;
}
