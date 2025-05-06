import rateLimit from "express-rate-limit";
import { Router, RequestHandler } from "express";
import userController from "../controllers/UserController";
import { authenticateToken } from "../middlewares/jwt";

const routes = Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many requests, please try again later.",
}) as RequestHandler;

routes.post("/signin",
  limiter,
  userController.readUser
);

routes.post("/signup",
  limiter,
  userController.createUser
);

routes.put(
  "/updatePassword",
  limiter,
  authenticateToken,
  userController.updatePassword
);

export default routes;
