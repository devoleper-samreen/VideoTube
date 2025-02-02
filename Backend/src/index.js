import express from "express"
import dotenv from 'dotenv';
import connectDB from "./DB/dbConnect.js"

dotenv.config(
    {
        path: "./.env"
    }
);

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.listen(port, () => {
    console.log(`App is running on : http://localhost:${port}`);
})