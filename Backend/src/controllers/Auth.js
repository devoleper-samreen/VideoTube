import express from "express";
import jwt from "jsonwebtoken"
import cors from "cors"
import { oauth2client } from "../utils/googleConfig";
import { ApiError } from "../utils/apiError";
import GUser from "../models/googleAuth.js"

const app = express();
app.use(cors());
app.use(express.json());

const googleLogin = async (req, res) => {
    try {
        const { code } = req.query

        if (!code) {
            throw new ApiError(500, "code is not found")
        }

        const googleRes = await oauth2client.getToken(code)

        if (!googleRes.tokens) {
            throw new ApiError(500, "googleRes token is not found")
        }

        oauth2client.setCredentials(googleRes.tokens)

        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${googleRes.tokens.access_token}`
        )

        const { name, email, picture } = userRes.data
        const user = await GoogleUser.findOne({ email })

        if (!user) {
            user = new GUser.create({
                name,
                email,
                picture
            })

            await user.save();
        }

        const { _id } = user
        const token = jwt.sign(
            {
                _id,
                email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        )

        return res.status(200).json(
            new ApiResponse(200, "user login successfully!", { user, token })
        )


    } catch (error) {

        return res.status(500).json(new ApiError(500, "internal server error"));

    }

}

export default googleLogin
