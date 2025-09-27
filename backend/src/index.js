import 'dotenv/config'; 

import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";

import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/user.routes.js";

// ⚡ Step 1: Express app + HTTP server
const app = express();
const server = createServer(app);
const io = connectToSocket(server);

// ⚡ Step 2: middlewares
app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

// ⚡ Step 3: routes
app.use("/api/users", userRoutes); // Supabase OTP + JWT routes

// Test home route
app.get("/home", (req, res) => {
  return res.json({ hello: "world" });
});

// ⚡ Step 4: start server + connect MongoDB
const start = async () => {
  try {
    const connectionDb = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${connectionDb.connection.host}`);

    server.listen(app.get("port"), () => {
      console.log(`🚀 Server running on port ${app.get("port")}`);
    });
  } catch (err) {
    console.error("❌ DB Connection Error:", err.message);
  }
};

console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
console.log("SUPABASE_KEY:", process.env.SUPABASE_KEY);


start();
