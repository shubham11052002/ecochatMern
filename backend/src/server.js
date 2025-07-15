import express from "express";
import dotenv from "dotenv";
import { connectionDb } from "./lib/database.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("<h1>hello world</h1>")
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
  connectionDb();
});