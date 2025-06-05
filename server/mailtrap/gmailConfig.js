import nodemailer from "nodemailer";
import { config } from "dotenv";

config();

// Create a test account or replace with real credentials.
export const gmailClient = nodemailer.createTransport({
    service: "gmail",
    secure : true,
    port : 465,
    auth: {
        user: "idf018208@gmail.com",
        pass: process.env.APP_PASSWORD
    }
});