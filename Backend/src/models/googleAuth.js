import mongoose from "mongoose"

const googleUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    picture: {
        type: String,
        required: true,
        trim: true
    }
},
    {
        timestamps: true
    }
)

export const GUser = mongoose.model("GUser", googleUserSchema)
