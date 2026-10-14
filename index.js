import "dotenv/config";
import express from "express";
import fs from "fs";
import cors from "cors";
import fileUpload from "express-fileupload";
import { dbConnect } from "./config/db.js";
import router from "./route/userRoute.js";
import adminRoute from "./route/adminRoute.js";

const app = express();

// Middleware
app.use(express.json());
app.use(fileUpload());
app.use(
  cors({
    // Comma-separated list in FRONTEND_URL, e.g. https://quirex.vercel.app
    // If not set, all origins are allowed.
    origin: process.env.FRONTEND_URL
      ? process.env.FRONTEND_URL.split(",").map((u) => u.trim().replace(/\/$/, ""))
      : true,
  })
);

// Make sure the uploads folder exists
fs.mkdirSync("uploads", { recursive: true });

// Health check
app.get("/", (req, res) => res.send("Quirex backend is running"));

// Database
dbConnect();

// Static images + API routes
app.use("/img", express.static("uploads"));
app.use("/api", router);
app.use("/api", adminRoute);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
