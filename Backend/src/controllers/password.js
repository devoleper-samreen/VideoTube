import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import { generateAccessToken } from "../utils/generateTokens.js";
import { transport } from "../utils/emailConfig.js";

export const changePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { oldPassword, newPassword } = req.body;

        // Validate inputs
        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                message: "Both old and new passwords are required"
            });
        }

        // Find user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Check if old password matches
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Old password is incorrect"
            });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update password in database
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({
            message: "Password updated successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Generate reset token
        const resetToken = generateAccessToken(user);

        const resetLink = `${process.env.FRONTEND_HOST}/reset-password/${user.id}/${resetToken}`;

        await transport.sendMail({
            from: process.env.EMAIL_FROM,
            to: user.email,
            subject: "reset your password",
            html: `<p>
            Hii, ${user.name} <br>
            Click the link below to reset your password <br>
            <a href="${resetLink}">Reset Password</a>
            </p>`}
        )

        return res.status(200).json({
            message: "Password reset link sent to your email"
        });

    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}


export const resetPassword = async (req, res) => {
    try {
        const { id, token } = req.params;//userid and accesstoken
        const { newPassword, confiremPassword } = req.body;

        if (!token) {
            return res.status(401).json({
                message: "Access token missing. Please log in again."
            });
        }

        if (!newPassword || !confiremPassword) {
            return res.status(400).json({
                message: "Both new password and confirm password are required"
            });
        }

        if (newPassword !== confiremPassword) {
            return res.status(400).json({
                message: "Passwords do not match"
            });
        }

        //verify token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(id);

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update password in database
        user.password = hashedPassword;

        await user.save();

        res.status(200).json({
            message: "Password reset successful"
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};


