import bcryptjs from 'bcryptjs';
import crypto from 'crypto';

import { User } from '../models/user.model.js';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js'

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
            verificationTokenExpiresAt: Date.now() + 2 * 60 * 60 * 1000, //Expires after  2hr
        });

        await user.save();

        //sending jwt token
        generateTokenAndSetCookie(res, user._id);

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