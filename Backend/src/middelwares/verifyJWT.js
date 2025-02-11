import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import dotenv from "dotenv"
dotenv.config()

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
        console.log("token", token);
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized, no token"
            });
        }
        console.log("token found");
        console.log(process.env.ACCESS_TOKEN_SECRET);

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log("decoded", decoded);
        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        next();
    } catch (error) {
        res.status(401).json({
            message: "Invalid token",
            error: error.message
        });
    }
};
