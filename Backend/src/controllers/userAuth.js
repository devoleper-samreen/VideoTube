import { User } from "../models/user"
import bcrypt from "bcrypt"

//registration
export const registration = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            throw new ApiError(400, "All fields are required")
        }

        //check user already exisxt
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            throw new ApiError(409, "Email already exists")
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
            new ApiError(500, "error in creating user")

        }

        res.status(201).json(new ApiResponse(200, "user create seuccess", newUser))



    } catch (error) {
        res.status(500).json(new ApiError(500, "user not egistered"))

    }

}
//email varification
//login
//get accesstoken and refreshtoken
//change password
//send password reset email
//reset email
//logout
//profile

