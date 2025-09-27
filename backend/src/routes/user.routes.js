import { Router } from "express";
import { sendOtp, verifyOtp } from "../controllers/authController.js";
import { getUsers } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

// Email OTP login/register
router.post("/login", sendOtp);
router.post("/verify", verifyOtp);

// Protected users route
router.get("/", verifyToken, getUsers);

export default router;
