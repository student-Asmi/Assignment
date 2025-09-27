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

// Public users route (no token needed)
router.get("/users", async (req, res) => {
  try {
    // Sirf safe fields bhejna (phone, gender, dob) → password ya email bilkul nahi
    const users = await User.find({}, "phone Gender dob").lean();
    res.json({ users });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


export default router;
