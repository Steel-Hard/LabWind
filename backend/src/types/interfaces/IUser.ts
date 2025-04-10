import { Role } from "../enums/role";

interface IUser {
    name: string;
    email: string;
    password: string;
    role: Role;
}

export default IUser