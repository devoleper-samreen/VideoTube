import express from "express"
//import dotenv from 'dotenv';

dotenv.config(
    {
        path: "./.env"
    }
);

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`App is running on : http://localhost:${port}`);
})