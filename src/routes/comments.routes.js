import { Router } from "express";
import { addComment, getComments } from "../controllers/comments.controllers.js";

const router = Router()

//GET comments by ID
router.get('/comments/:id', getComments)

//ADD comments
router.post('/comments', addComment)



export default router