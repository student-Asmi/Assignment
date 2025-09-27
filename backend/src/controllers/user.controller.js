import User from "../models/user.model.js";

// GET users (optional gender filter)
export const getUsers = async (req, res) => {
  try {
    const filter = {};
    if (req.query.gender && req.query.gender !== "all") {
      filter.gender = req.query.gender;
    }
    const users = await User.find(filter).select("-__v");
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
