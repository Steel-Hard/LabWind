import { Request,Response } from "express";
import userModel from "../models/user";

class UserController{
    public async createUser(req:Request,res:Response){
        const {name,email,password} = req.body;
        try {
            const data = await userModel.insertOne({name,email,password});            
            res.status(201).json({data});
        } catch (error) {
            console.log(error);
            throw new Error("Erro ao criar usuário");   
        }
    }
    public async readUser(req:Request,res:Response){
        const {email,password} = req.body;
        try {
            const data = await userModel.find({email,password});            
            res.status(302).json({data});
        } catch (error) {
            console.log(error);
            throw new Error("Erro ao buscar usuário");   
        }
    }


}

export default new UserController;