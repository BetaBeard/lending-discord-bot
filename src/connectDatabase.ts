import { connect } from "mongoose";

// Connect to personal cluster of MongoDB
export const connectDatabase = async () => {
    await connect(process.env.MONGO_URI!);
    console.log("Database Connected!")
}