import http from "http";
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/index.js";
import productRoutes from "./routes/product.js";
import resumeRoutes from "./routes/resume.js";

dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// views config
app.set("view engine", "ejs");
app.use(express.static("public"));

// routes
app.use("/products", productRoutes);
app.use("/resumes", resumeRoutes);

// http server
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

connectDB()
    .then(() => {
        server.listen(PORT, () =>
            console.log(`server started at http://localhost:${PORT}`)
        );
    })
    .catch((err) => {
        console.error("Failed to connect to database:", err.message);
        process.exit(1);
    });
