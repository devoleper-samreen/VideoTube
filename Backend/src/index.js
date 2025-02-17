import express from "express"
import dotenv from 'dotenv';
import connectDB from "./DB/dbConnect.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import passport from "passport"
import userRoute from "./routes/userRoute.js"
import videoRoute from "./routes/videoRoute.js"
import commentRoute from "./routes/comment.js"
import likeRoute from "./routes/like.js"
import feedRoute from "./routes/feed.js"
import playlistRoute from "./routes/playlist.js"
import searchRoute from "./routes/search.js"

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
app.use("/api/video", videoRoute)
app.use("/api/feed", feedRoute)
app.use("/api/like", likeRoute)
app.use("/api/comment", commentRoute)
app.use("/api/playlist", playlistRoute)
app.use("/api/search", searchRoute)

connectDB();

app.listen(port, () => {
    console.log(`App is running on : http://localhost:${port}`);
})