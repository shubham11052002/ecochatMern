import express from "express";
import dotenv from "dotenv";
import { connectionDb } from "./lib/database.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectionDb();
});