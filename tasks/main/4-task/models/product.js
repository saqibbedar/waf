import mongoose from "mongoose";
import { remoteDB, localDB } from "../config/index.js";

const productSchema = new mongoose.Schema(
    {
        productName: { type: String, required: true },
        firmName: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        expiryDate: { type: Date, required: true },
    },
    { timestamps: true }
);

export const RemoteProduct = remoteDB.model("Product", productSchema);
export const LocalProduct = localDB.model("Product", productSchema);

export { RemoteProduct as default };
