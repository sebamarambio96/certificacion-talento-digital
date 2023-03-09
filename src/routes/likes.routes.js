import { Router } from "express";
import { getLikes, putLike } from "../controllers/likes.controllers.js";

const router = Router()

//GET likes by ID
router.get('/likes/:id', getLikes)

//User Info
router.put ('/likes', putLike)



export default router