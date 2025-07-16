import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createToken } from "../lib/authToken.js";
import cloudinary from "../lib/cloudinary.js";

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
        createToken(newUser._id, res);
        await newUser.save();
        // for new user token will create here
        if (newUser) {
            res.status(201).json({
                id: newUser._id,
                email: newUser.email,
                fullName: newUser.fullName,
                profilePic: newUser.profilePic,
                message: "User created successfully",
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
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Please enter all required fields" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User doesnt exists please singup first!" });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Wrong Password & Invalid Credentials!" })
        }
        createToken(user._id, res);
        res.status(200).json({
            id: user._id,
            email: user.email,
            fullName: user.fullName,
            profilePic: user.profilePic,
            message: "User login successful!",
        });
    } catch (error) {
        console.log("Error in login controller:", error);
        return res.status(500).json({ message: "internal server error0" })
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "",
            {
                httpOnly: true,
                sameSite: "None",
                secure: true,
                maxAge: 0,
            }
        )
        res.status(200).json({ message: "User Logged out successfullt!" })
    } catch (error) {
        console.log("Error come in Logout Controller... ", error);
        return res.status(500).json({ message: "Internal server error3" })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user.id;
        if (!profilePic) {
            return res.status(400).json({ message: "Please provide a profile picture URL" });
        }

        const result = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: result.secure_url }, { new: true }).select("-password");
        // console.log("Profile updated successfully", updatedUser);
        res.status(200).json({ updatedUser, message: "Profile updated successfully" });
    } catch (error) {
        console.log("Error in updateProfile Contorllers", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json({ user: req.user, message: "User is authenticated!" });
    } catch (error) {
        console.log("Error in checkAuth controller:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
