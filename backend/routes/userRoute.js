import express from "express";
import userController from "../controllers/userController.js";

const userRoute = express.Router();

userRoute.get("/login", userController.userLogin);
userRoute.post("/create-user", userController.createUser);
userRoute.post("/forgot-password", userController.forgotPassword);

export default userRoute;
