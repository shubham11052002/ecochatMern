import mongoose from "mongoose";

export const connectionDb = async () => {
    try {
        await mongoose.connect(process.env.MongoDB_URI).then((connection) => {
            console.log(`MongoDb Onnection is Successful connected:  ${connection.connection.host}`);
            // console.log(process.env.MongoDB_URI);
        })
    } catch (error) {
        console.error("MongoDB connection failed", error);
    }
}

