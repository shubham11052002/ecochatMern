import Message from "../models/messages.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js"

export const getUserOnSiderbar = async (req, res) => {
    try {
        const loggedinUserId = req.user.id;
        const filteredUser = await User.findOne({ _id: { $ne: loggedinUserId } }).select("-password");
        console.log("Filtered User:", filteredUser);
        return res.status(200).json({ message: "User fetched successfully", user: filteredUser })
    } catch (error) {
        console.error("Error fetching users for sidebar:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;
        const message = await Message.find({
            $or: [
                { myId: myId, receiverId: userToChatId },
                { myId: userToChatId, receiverId: myId }
            ]
        })
        return res.status(200).json({ message });
    } catch (error) {
        console.error("Error fetching messages:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const { senderId } = req.user._id;
        let imgUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imgUrl = uploadResponse.secure_url;
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imgUrl,
        });
        await newMessage.save();
        return res.status(200).json({ newMessage });

    } catch (error) {
        console.log("Error in sending message", error.message);
        return res.status(500).json({ message: "Internal server error.." })
    }
}
