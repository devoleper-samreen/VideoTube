import express from "express"
import dotenv from 'dotenv';
import connectDB from "./DB/dbConnect.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import passport from "passport"
import userRoute from "./routes/userRoute.js"

dotenv.config(
    {
        path: "./.env"
    }
);

const app = express();
const port = process.env.PORT || 5000;
const corsOptions = {
    origin: process.env.FRONTEND_HOST,
    credential: true,
    optionSuccesStatus: 200
}

//middlewares
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize())
app.use(express.json({
    limit: "16kb"
}))
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))
app.use(express.static("public"))

//routes
app.use("/api/user", userRoute)

connectDB();

app.listen(port, () => {
    console.log(`App is running on : http://localhost:${port}`);
})