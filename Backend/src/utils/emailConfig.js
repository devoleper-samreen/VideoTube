import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

console.log("EMAIL_HOST:", process.env.EMAIL_HOST);
console.log("EMAIL_PORT:", process.env.EMAIL_PORT);
console.log("AUTH_USER:", process.env.AUTH_USER);
console.log("AUTH_PASS:", process.env.AUTH_PASS);

export const transport = nodemailer.createTransport({

    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASS
    }
})


export const sendEmailOTP = async (req, user) => {
    try {
        const otp = Math.floor(1000 + Math.random() * 9000)
        const otpVerificationLink = `${process.env.FRONTEND_HOST}/account/verify-email`

        await transport.sendMail({
            from: process.env.EMAIL_FROM,
            to: user.email,
            subject: "verify your email",
            html: `<p>${otpVerificationLink} <br>
            <h1> ${otp} </h1>
            </p>`
        })

        console.log("OTP sent successfully:", otp);

        return otp;

    } catch (error) {
        console.error("Error in sendEmailOTP:", error);
        throw new Error("Failed to send OTP email");

    }
}