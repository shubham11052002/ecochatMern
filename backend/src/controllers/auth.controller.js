import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createToken } from "../lib/authToken.js";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (!email || !fullName || !password) {
            return res.status(400).json({ message: "please enter the all required fields..." });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);;
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email: email,
            fullName: fullName,
            password: hashedPassword,
        })
        // for new user token will create here
        if (newUser) {
            createToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                id: newUser._id,
                email: email,
                fullName: fullName,
                password: hashedPassword,
            })
        }
        else {
            return res.status(400).json({ message: "User creation failed" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.log("Error in signup controller:", error);
    }
}


export const login = async (req, res) => {
    res.status(200).json({ message: "Login endpoint is not implemented yet" });
}
export const logout = async (req, res) => {
    res.status(200).json({ message: "Logout endpoint is not implemented yet" });
}
