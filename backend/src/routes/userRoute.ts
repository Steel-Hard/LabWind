import rateLimit from "express-rate-limit";
import { Router } from "express";
import userController from "../controllers/UserController";

const routes = Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5,
  message: "Too many requests, please try again later."
});


routes.post("/signin", limiter, userController.readUser);
routes.post("/signup", userController.createUser);

export default routes;
