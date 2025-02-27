import jwt from "jsonwebtoken"
import { User } from "../models/user.js"
import { generateAccessToken, generateRefreshToken } from "../utils/generateTokens.js"

export const refreshAccessToken = async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken;

    if (!incomingRefreshToken) {
        return res.status(401).json({
            message: "Unauthorized request: Refresh token missing"
        })
    }

    try {
        console.log(process.env.REFRESH_TOKEN_SECRET)
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
        console.log(decodedToken)

        if (!decodedToken) {
            return res.status(401).json({
                message: "Invalid refresh token: Token mismatch"
            })
        }

        const user = await User.findById(decodedToken?.id)

        if (!user) {
            return res.status(401).json({
                message: "Invalid refresh token: User not found"
            })
        }

        // if (incomingRefreshToken !== user?.refreshToken) {
        //     return res.status(402).json({
        //         message: "Invalid refresh token: Token mismatch"
        //     })
        // }
        const accessToken = generateAccessToken(user)
        const newRefreshToken = generateRefreshToken(user)
        user.refreshToken = newRefreshToken;
        await user.save();

        const options = {
            httpOnly: true,
            secure: false, //secure for production
            sameSite: 'none' //Strict for production
        }

        // Purana token clear kar do
        res.clearCookie("accessToken", options);
        res.clearCookie("refreshToken", options);

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json({
                statusCode: 200,
                data: {
                    accessToken,
                    refreshToken: newRefreshToken
                },
                message: "Access token refreshed successfully"
            })

    } catch (error) {
        return res.status(401).json({
            message: error?.message || "Invalid refresh token"
        })
    }
}