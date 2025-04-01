import { Router } from "express";
import userController from "../controllers/UserController";

const routes = Router();

routes.post("/signin", userController.readUser);
routes.post("/signup", userController.createUser);

export default routes;
