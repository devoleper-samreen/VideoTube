import { Router } from "express"
import googleLogin from "../controllers/Auth.js"

import googleRedirect from "../controllers/googlePageRedirect.js"

const router = Router();

app.get("/auth/google", googleRedirect);
router.get('/auth/google/calback', googleLogin)
