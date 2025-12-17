import { Router } from "express";
import { getMe, login, register } from "../Controllers/authController.js";

const authRouter = Router()

authRouter.post("/login",login)
authRouter.post("/register",register)
authRouter.get("/me",getMe)

export default authRouter