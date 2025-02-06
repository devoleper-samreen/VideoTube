import mongoose from "mongoose";

const emailVerificationSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: "15m"
    }
})

const EmailVerification = mongoose.model("EmailVerification", emailVerificationSchema)

export default EmailVerification