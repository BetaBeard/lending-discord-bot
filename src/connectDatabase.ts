import { connect } from "mongoose";

// Connect to personal cluster of MongoDB
export const connectDatabase = async () => {
    try {
        console.log("Connecting to database...")
        await connect(process.env.MONGO_URI!);
        console.log("Database Connected!")
    } catch(error) {
        console.error("Error while connecting to database", error);
        process.exit(1);
    }   
}