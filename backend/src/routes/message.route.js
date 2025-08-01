import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js"
import { getMessages, getUserOnSiderbar, sendMessage } from "../controllers/message.controllers.js";
const router = express.Router();

router.get("/users", isAuthenticated, getUserOnSiderbar);
router.get("/:id", isAuthenticated, getMessages);
router.post("/send/:id", isAuthenticated, sendMessage);

export default router;