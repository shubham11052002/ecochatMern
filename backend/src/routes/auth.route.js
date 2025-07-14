import express from "express";
const router = express.Router();
import { signup } from "../controllers/auth.controller.js";

router.post("/singup", signup)
router.post("/login", (req, res) => {
    res.send("login route is working");
})
router.post("/logout", (req, res) => {
    res.send("logout route is working");
})

export default router;