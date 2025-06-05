import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_TEMPLATE } from './emailTemplates.js';
import { mailtrapClient, sender } from './mailtrap.config.js'
import { gmailClient } from './gmailConfig.js';

export const sendVerificationEmail = async (email, verificationToken) => {
    try {
        const receiver = {
          from : sender,
          to : email,
          subject : "Node Js Mail Testing!",
          html : VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken)
        };
        // const response = await gmailClient
        //   .sendMail({
        //     from: sender,
        //     to: email,
        //     subject: "Verify your email",
        //     html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
        //     category: "Email Verification",
        //   });
        const response = await gmailClient
          .sendMail(receiver, (error, emailResponse) => {
            if(error)
              throw new Error(error);
        });
        
        console.log("Email sent successfully ")
    } catch (error) {
        console.error('Error sending verification', error);
    }
}

export const sendWelcomeEmail = async (email, name) => {
  try {
    console.log("Sending welcome email....");

    const response = await mailtrapClient.sendMail({
      from: sender,
      to: email,
      subject: "Welcome email",
      html: WELCOME_TEMPLATE,
      category: "Welcome Message"
    });

    console.log("Welcome email sent successfully", response);
  } catch (error) {
    console.error(`Error sending welcome email`, error);
  }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const response = await mailtrapClient.sendMail({
      from: sender,
      to: email,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });

    console.log("Reset password email sent : ", response)
  } catch (error) {
    console.log("Error sending password reset email ", error);
    
    throw new Error("Error sending password reset email ", error);
  }
}