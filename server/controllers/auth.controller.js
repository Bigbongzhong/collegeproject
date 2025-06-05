import bcryptjs from 'bcryptjs';
import crypto, { hash } from 'crypto';

import { User } from '../models/user.model.js';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js'
import { sendPasswordResetEmail, sendVerificationEmail, sendWelcomeEmail } from '../mailtrap/emails.js';

export const signup = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        if(!name || !email || !password) 
            throw new Error("All Fields are required");
        
        const userAlreadyExists = await User.findOne({ email });
        if(userAlreadyExists){
            console.log(`User ${userAlreadyExists.name} already exists`);
            return res.status(400).json({ success: false, message: `User ${userAlreadyExists.name} already exists`});
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 15 * 60 * 1000, //Expires after  2hr
        });

        await user.save();

        //sending jwt token
        generateTokenAndSetCookie(res, user._id);

        sendVerificationEmail(user.email, verificationToken);
        console.log(verificationToken)

        res.status(201).json({
            success:true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export const verifyEmail = async (req, res) => {
    const { code } = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() },
        });
        
        if( !user )
            return res.status(400).json({
                success : false,
                message : "Invalid or expired verification code"
            });

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.name);

    	res.status(200).json({
			success: true,
			message: "Email verified successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
    }catch (error) {
		console.log("error in verifyEmail ", error);
		res.status(500).json({ success: false, message: "Server error" });
    }
}

export const resendVerifyCode = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email : email});

        if(!user) 
            return res.status(400).json({ success: false, message: "User not found"});

        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        user.verificationToken = verificationToken;
        user.verificationTokenExpiresAt = Date.now() + 15 * 60 * 1000;
        user.save();

        sendVerificationEmail(user.email, verificationToken);

        return res.status(200).json({ success: true, message: "Verification code resend."});
    } catch (error) {
        return res.status(500).json({ success: false, 
            message: "Error in resending verification code."
        })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if(!user) 
            return res.status(400).json({ succes: false, message: "Invalid Credentials" });

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if(!isPasswordValid)
            return res.status(400).json({ success: false, message: "Invalid Password"});

        generateTokenAndSetCookie(res, user._id);

        user.lastLogin = new Date();
        await user.save();
        const date = new Date(user.lastLogin).toLocaleDateString('en-IN', {
            year: "numeric",
            month: "long",
            day: "numeric",
		});
        const time = new Date(user.lastLogin).toLocaleTimeString('en-IN');
        console.log("Logged in on ", date, " at ", time);

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user : {
                ...user._doc,
                password: undefined,
            }
        });
    } catch (error) {
        console.log("Error in login ", error);
        res.status(400).json({ success: false, message: error.message });
    }
}

export const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ success: true, message: "Logged out successfully" });
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if(!user)
            return res.status(400).json({ succes: false, message: "User not found "});

        const resetToken = crypto.randomBytes(20).toString('hex');

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = Date.now() + 15 * 60 * 1000;//Expires in 15min
        await user.save();

        sendPasswordResetEmail(email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

        res.status(200).json({ success: true, message: "Password reset link sent to your email ", email, resetToken});
    } catch (error) {
        console.log("Error in forgotPassword ", error);
        res.status(400).json({ success: false, message: error.message });
    }
}

export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
        })
        if(!user)
            return res.status(400).json({ success: false, message: "Invalid reset token"});

        if(user.resetPasswordExpiresAt < Date.now())
            return res.status(400).json({ success: false, message: "Expired reset token"});

        const hashedPassword = await bcryptjs.hash(password, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();

        res.status(200).json({ succes: true, message: "Password reset successfully"});
    } catch (error) {
        console.log("Error in reseting password ", error);
        res.status(400).json({ succes: false, message: error.message });
    }
}