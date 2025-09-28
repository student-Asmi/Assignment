import { Router } from "express";
import { sendOtp, verifyOtp } from "../controllers/authController.js";
import { getUsers } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import User from "../models/user.model.js";

const router = Router();

// Auth routes
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
// router.get("/api/users/public", async (req, res) => {
//   // yaha tum dummy + registered dono bhej sakte ho
//   const dummy = [
//     { _id: "1", phone: "0000000000", Gender: "N/A", dob: "N/A" },
//     { _id: "2", phone: "1111111111", Gender: "Female", dob: "2000-01-01" }
//   ];
//   const users = await User.find({}, "phone Gender dob").lean();
//   res.json({ users: [...dummy, ...users] });
// });


router.get("/users", verifyToken, getUsers);
 

// Public users
router.get("/public", async (req, res) => {
  try {
    const dummy = [
      { _id: "1", phone: "0000000000", Gender: "N/A", dob: "N/A" },
      { _id: "2", phone: "1111111111", Gender: "Female", dob: "2000-01-01" }
    ];
    const users = await User.find({}, "phone Gender dob").lean();
    res.json({ users: [...dummy, ...users] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch public users" });
  }
});

export default router;
