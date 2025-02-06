import { User } from "../models/user.js"
import bcrypt from "bcrypt"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { sendEmailOTP } from "../utils/emailConfig.js"
import EmailVerification from "../models/emailVerification.js"

//registration
export const registration = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!(name && email && password)) {
            return res.status(400).json(new ApiError(400, "All fields are required"));
        }

        //check user already exisxt
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(409).json(new ApiError(409, "Email already exists"));
        }

        //password hashing
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)


        //create user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();

        if (!savedUser) {
            return res.status(500).json(new ApiError(500, "Error in creating user"));

        }
        console.log("otp before");


        await sendEmailOTP(req, newUser);
        console.log("otp after");

        res.status(201).json(new ApiResponse(201, "user create seuccess", newUser))


    } catch (error) {
        res.status(500).json(new ApiError(500, "user not egistered"))

    }

}
//email varification
export const verifyEmail = async (req, res) => {
    try {
        const { email, otp } = req.body

        if (!email || !otp) {
            return res.status(400).json({
                status: "failed",
                message: "all feilds are requred"
            })
        }

        const existingUser = await User.findOne({ email })

        if (!existingUser) {
            return res.status(404).json({
                status: "failed",
                message: "email does not exists"
            })

        }

        if (existingUser.isVerified) {
            return res.status(400).json({
                status: "failed",
                message: "email alreday verified"
            })
        }

        const emailVerification = await EmailVerification.findOne({
            userId: existingUser._id,
            otp
        })

        if (!emailVerification) {
            if (!existingUser.isVerified) {
                await sendEmailOTP(req, existingUser)

                return res.status(400).json({
                    status: "failed",
                    message: "invalid otp, new otp sent to your email"
                })

            }

            return res.status(400).json({
                status: "failed",
                message: "invalid otp"
            })
        }

        const currentTime = new Date();

        const expirationTime = new Date(emailVerification.createdAt.getTime() + 15 * 60 * 1000)

        if (currentTime > expirationTime) {
            await sendEmailOTP(req, existingUser)

            return res.status(400).json({
                status: "failed",
                message: "invalid otp, new otp sent to your email"
            })

        }

        existingUser.isVerified = true
        await existingUser.save()

        await EmailVerification.deleteMany({
            userId: existingUser._id
        })

        return res.status(200).json({
            status: "success",
            message: "invalid otp, new otp sent to your email"
        })

    } catch (error) {
        res.status(500).json({
            message: "verify email error",
            error: error
        })

    }

}
//login
//get accesstoken and refreshtoken
//change password
//send password reset email
//reset email
//logout
//profile

