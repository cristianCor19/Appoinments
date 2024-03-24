import { Router } from "express";

import {
    saveUser,
    loginUser
}from '../controllers/controll_user.js'

const router = Router()

router.post('/registerUser', saveUser)
router.post('/login', loginUser)

export default router