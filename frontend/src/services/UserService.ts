import { api } from "./api";

class UserService {
    public static async  signin(email:string,password:string){
        const {data} = await api.post("/users/signin",{email,password});

        return data;
    }
    public static async signup(name:string,email:string,password:string, role:string){
        const {data} = await api.post("/users/signup",{name,email,password,role})

        return data;
    }
}

export default UserService;