import express from "express";
import dotenv from "dotenv";
import { connectionDb } from "./lib/database.js";
import authRoutes from "./routes/auth.route.js";
const app = express();
dotenv.config();
const port = process.env.PORT;
app.use("/api/auth", authRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectionDb();
});


