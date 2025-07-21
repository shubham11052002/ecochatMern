import mongoose from "mongoose";

export const connectionDb = async () => {
    try {
        await mongoose.connect(process.env.MongoDB_URI).then((connection) => {
            // console.log(`MongoDb Cnnection is Successful connected:  ${connection.connection.host}`);
            // console.log(process.env.MongoDB_URI);
            console.log("MongoDb Connection Successful...")
        })
    } catch (error) {
        console.error("MongoDB connection failed", error);
    }
}

