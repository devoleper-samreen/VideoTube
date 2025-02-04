import express from "express"
import { registration } from "../controllers/userAuth.js"

const router = express.Router();

router.post('/register', registration)

export default router