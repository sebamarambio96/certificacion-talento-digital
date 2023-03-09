import { Router } from "express";
import { backup } from "../controllers/backup.controllers.js";

const router = Router()

//GET all news
router.post('/backup', backup)


export default router