import express from "express";
import postRoute from "./routes/post.route.js"; // Note: Check your pathing (usually ./routes)
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from 'cors';

const app = express();

// 1. Updated CORS with Credentials
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true // MANDATORY for cookies/JWT to work
}));

app.use(express.json());
app.use(cookieParser());

// 2. Routes
app.use("/api/post", postRoute);
app.use("/api/auth", authRoute);

export default app;