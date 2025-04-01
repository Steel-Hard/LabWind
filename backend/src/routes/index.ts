import { Router,Request,Response } from "express";
import userController from "./userRoute";

const routes = Router();

routes.use("/users", userController)

routes.use((_req:Request, _res: Response) => {
    _res.status(404).json({message:"Resouce Not Found"});
} )

export default routes;

