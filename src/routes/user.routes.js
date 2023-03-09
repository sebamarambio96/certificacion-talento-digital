import { Router } from "express";
import { getUsersInfo, getUserInfo, addUser, login } from "../controllers/user.controllers.js";

const router = Router()

//GET all users
router.get('/users', getUsersInfo)

//User Info
router.get('/users/:id', getUserInfo)

//Login
router.post('/login', login)

//ADD new user
router.post('/register', addUser)

export default router