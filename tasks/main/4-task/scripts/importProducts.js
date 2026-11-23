import fs from "fs";
import { connectDB } from "../config/index.js";
import { RemoteProduct, LocalProduct } from "../models/index.js";

const importProducts = async () => {
    try {
        await connectDB();

        const data = JSON.parse(fs.readFileSync("./assets/products.json", "utf8"));

        if (!Array.isArray(data) || data.length !== 1000) {
            throw new Error("assets/products.json must contain exactly 1000 products.");
        }

        const remoteCount = await RemoteProduct.countDocuments();
        const localCount = await LocalProduct.countDocuments();

        if (remoteCount > 0 || localCount > 0) {
            throw new Error("Product collection is not empty. Import stopped to avoid duplicates.");
        }

        await RemoteProduct.insertMany(data);
        await LocalProduct.insertMany(data);

        console.log("1000 products imported into both databases.");
    } catch (error) {
        console.error("Product import failed:", error.message);
        process.exitCode = 1;
    } finally {
        await Promise.allSettled([RemoteProduct.db.close(), LocalProduct.db.close()]);
    }
};

importProducts();
