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

// // Registered users (auth protected)
// router.get("/users", verifyToken, async (req, res) => {
//   const users = await User.find({}, "phone Gender dob").lean();
//   res.json({ users });
// });

// Public users (no auth needed)
router.get("/api/users/public", async (req, res) => {
  // yaha tum dummy + registered dono bhej sakte ho
  const dummy = [
    { _id: "1", phone: "0000000000", Gender: "N/A", dob: "N/A" },
    { _id: "2", phone: "1111111111", Gender: "Female", dob: "2000-01-01" }
  ];
  const users = await User.find({}, "phone Gender dob").lean();
  res.json({ users: [...dummy, ...users] });
});



export default router;
