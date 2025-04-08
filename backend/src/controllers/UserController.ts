import { Request,Response } from "express";
import userModel from "../models/user";
import IUser from "../types/interfaces/IUser";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";


class UserController{
    public async createUser(req:Request,res:Response){
        const {name,email,password,role} = req.body as IUser;
        const nPassword = await bcrypt.hash(password,8);

        try {
            const data = await userModel.insertOne({name,email,password:nPassword,role});            
            res.status(201).json({data});
        } catch (error) {
            console.log(error);
            throw new Error("Erro ao criar usuário");   
        }
    }
    public async readUser(req:Request,res:Response){
        const {email,password} = req.body;
        try {

            const data = await userModel.findOne({email: email});

            // if(data?.password) await bcrypt.compare(password,data.password)
            //     .then((boolean) => {
            //         boolean == true?  
            //         :
            //     })
                
            //     jwt.sign({}, ,{})
            
            
            res.status(302).json({data});
        } catch (error) {
            console.log(error);
            throw new Error("Erro ao buscar usuário");   
        }
    }


}

export default new UserController;