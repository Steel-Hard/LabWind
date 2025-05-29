import { Router,Request,Response } from "express";
import userController from "./userRoute";
import sensorDataRoutes from "./sensorDataRoute";
import labwindDataController from "./labwindDataRoute";
import barragemRoutes from "./barragemRoutes";
import { authenticateToken } from "../middlewares/jwt";
const routes = Router();

routes.use("/users", userController);
routes.use("/sensor-data", sensorDataRoutes);
routes.use("/labwind", labwindDataController);
routes.use("/barragem", barragemRoutes);
routes.post("/token", authenticateToken, (req:Request,res:Response)=>{
    res.status(200).send("Token válido")
});

routes.use((_req:Request, _res: Response) => {
    _res.status(404).json({message:"Resouce Not Found"});
} )

export default routes;

