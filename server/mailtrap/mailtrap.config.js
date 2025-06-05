import Nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";
import { config } from 'dotenv'

config();

export const mailtrapClient = Nodemailer.createTransport(
  MailtrapTransport({
    token: process.env.MAILTRAP_TOKEN,
  })
);

export const sender = {
  address: "hello@demomailtrap.co",
  name: "Om Thapa",
};