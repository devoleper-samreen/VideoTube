import express from "express"
import { registration, login, logout } from "../controllers/userAuth.js"

const router = express.Router();

router.post('/register', registration)
router.post('/login', login)
router.post('/logout', logout)

export default router