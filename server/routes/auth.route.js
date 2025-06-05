import express from 'express';
import { 
    forgotPassword, 
    login, 
    logout, 
    resendVerifyCode, 
    resetPassword, 
    signup, 
    verifyEmail 
} from '../controllers/auth.controller.js'
import { verifyToken } from '../middleware/verifyToken.js';
import { User } from '../models/user.model.js';

const router = express.Router();

router.get('/users', verifyToken, async (req, res) => {
    const id = req.userId;

    try {
        const user = await User.findById(id);

        if(!user)
            return res.status(400).json({ success: false, message: "User not found"});

        return res.status(200).json({ 
            success: true, 
            user: {
                ...user._doc,
                password: undefined
            }});
    } catch (error) {
        
    }
})

router.post('/signup', signup);
router.post("/login", login);
router.get("/logout", logout);

router.post('/verify-email', verifyEmail);
router.post('/resend-verify-code', resendVerifyCode);

router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

export default router;