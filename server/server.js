import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.route.js';
import { connectDB } from './db/connectDB.js';

//Manage environment variables
config();

const app = express()
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

//Middlewares
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(express.json());//For parsing req.body
app.use(cookieParser());//To allow to parse incoming cookie

app.use('/api/auth', authRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname,"", "client", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log("Server is listening on port : ", PORT);
})