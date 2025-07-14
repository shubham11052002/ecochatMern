import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const salt = await User.generateSalt(10);;
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = new User({
            email:email,
            fullName:fullName,
            password:hashedPassword,
        })

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.log("Error in signup controller:", error);
    }
}


