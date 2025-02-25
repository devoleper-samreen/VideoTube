import { User } from "../models/user.js"
import bcrypt from "bcrypt"
import { sendEmailOTP } from "../utils/emailConfig.js"
import EmailVerification from "../models/emailVerification.js"
import { generateAccessToken, generateRefreshToken } from "../utils/generateTokens.js"

//registration
export const registration = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!(name && email && password)) {
            return res.status(400).json({
                status: "failed",
                message: "All fields are required"
            });
        }

        //check user already exists
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(409).json({
                status: "failed",
                message: "Email already exists"
            });
        }

        //password hashing
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // //create user
        // const newUser = await User.create({
        //     name,
        //     email,
        //     password: hashedPassword
        // })

        // const savedUser = await newUser.save();

        // if (!savedUser) {
        //     return res.status(500).json({
        //         status: "failed",
        //         message: "Error in creating user"
        //     });
        // }

        //create user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        })

        console.log("otp before");
        const otpsent = await sendEmailOTP(req, newUser);
        console.log("otp after");

        if (!otpsent) {
            return res.status(500).json({
                status: "failed",
                message: "Error in sending otp"
            });
        }

        const savedUser = await newUser.save();

        if (!savedUser) {
            return res.status(500).json({
                status: "failed",
                message: "Error in creating user"
            });
        }

        res.status(201).json({
            status: "success",
            message: "User created successfully",
            user: newUser
        });

    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: "User not registered",
            error: error.message
        });
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
export const login = async (req, res) => {
    try {
        console.log("login called");
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                status: "failed",
                message: "all feilds are requred"
            })
        }
        console.log("email and password checked");

        const user = await User.findOne({ email })
        console.log("user found");

        if (!user) {
            return res.status(401).json({
                status: "failed",
                message: "invalid email or password"
            })
        }
        console.log("user found again");

        const isPasswordValid = await bcrypt.compare(password, user.password)
        console.log("password checked");

        if (!isPasswordValid) {
            return res.status(401).json({
                status: "failed",
                message: "invalid email or password"
            })
        }
        console.log("password is valid");

        if (!user.isVerified) {
            return res.status(400).json({
                status: "failed",
                message: "email not verified"
            })
        }
        console.log("email verified");

        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)
        console.log("tokens generated");

        user.refreshToken = refreshToken
        console.log("refresh token added to user");
        await user.save({ validateBeforeSave: false })
        console.log("user saved");

        //send cookie
        const options = {
            httpOnly: true,
            // secure: true
        }
        console.log("options set");

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                user: user,
                accessToken: accessToken,
                refreshToken: refreshToken
            });


    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: "login error",
            error: error
        })
    }
}

//logout
export const logout = async (req, res) => {
    try {
        console.log("logout called");
        console.log("logout called", req.user);

        await User.findByIdAndUpdate(
            req.user._id,
            {
                $unset: {
                    refreshToken: 1
                }
            },
            {
                new: true
            }
        )
        console.log("user updated");
        res.clearCookie("accessToken")
        res.clearCookie("refreshToken")
        console.log("cookies cleared");

        return res.status(200).json({
            status: "success",
            message: "logout success"
        })

    } catch (error) {
        res.status(500).json({
            message: "logout error",
            error: error
        })
    }
}

export const getMe = async (req, res) => {
    try {
        return res.json({
            message: "User fetched successfully",
            user: req.user
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch user data",
            error: error.message
        });
    }
};




