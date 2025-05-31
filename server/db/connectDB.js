import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb://localhost:27017/collage-chat-project");
        console.log("MongoDB Connected : ", conn.connection.host);
    } catch (error) {
        console.log("Error connection to MongoDB: ", error.message);
        process.exit(1);//Meaning failure
    }
}