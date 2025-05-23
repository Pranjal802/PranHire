import mongoose from "mongoose";
// import DB_NAME from "../constants.js";
import { DB_NAME } from "../Constants.js";

const connectDB = async () => {
    try {
        const dbUri = process.env.MONGO_URI;
        // const dbName = process.env.DB_NAME;
            
        if (!dbUri || !DB_NAME) {
            throw new Error("Missing MONGO_URI or DB_NAME in environment variables.");
        }

        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(`\n✅ MongoDB connected successfully!DB Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
};

export default connectDB;