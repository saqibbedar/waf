import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const remoteDB = mongoose.createConnection(process.env.REMOTE_URI);

export const localDB = mongoose.createConnection(process.env.LOCAL_URI);

export const connectDB = async () => {
    await Promise.all([remoteDB.asPromise(), localDB.asPromise()]);
    console.log("Remote MongoDB connected");
    console.log("Local MongoDB connected");
};
