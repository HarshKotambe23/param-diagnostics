import { Router } from "express";
import { login, logout } from "../controller/authController.js";

const router = Router();

router.post("/login", login).post("/logout", logout);

export default router;
