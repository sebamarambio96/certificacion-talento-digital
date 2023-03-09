import { Router } from "express";
import { addNews, getNews, getNewsById } from "../controllers/news.controllers.js";

const router = Router()

//GET all news
router.get('/allnews', getNews)

//GET news by id
router.get('/newss/:id', getNewsById)

//ADD news
router.post('/news', addNews)

export default router