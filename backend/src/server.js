import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import fileUpload from "express-fileupload";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectionDb } from "./lib/database.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
  connectionDb();
});
