import express from "express";
import htmlRoutes from "./routes/html.routes.js";
import userRoutes from "./routes/user.routes.js";
import likesRoutes from "./routes/likes.routes.js";
import newsRoutes from "./routes/news.routes.js";
import commentsRoutes from "./routes/comments.routes.js";
import backupRoutes from "./routes/backup.routes.js";
import cors from 'cors';
import path from 'path';
import { v4 } from 'uuid';
import multer from 'multer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

//middlewares
//Multer
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/img/uploads'),
    filename: (req, file, cb ) => {
        cb(null, v4() + path.extname(file.originalname.toLocaleLowerCase()))
    }
})
app.use(multer({
    storage,
    dest: path.join(__dirname, '../public/img/uploads'),
    limits: {fileSize: 2000000},
    fileFilter: (req, file,cb)=>{
        const filetypes = /jpeg|jpg|png|gif/
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname))
        if (mimetype && extname) {
            return cb(null, true)
        }
        cb("error: el archivo debe ser una imagen")
    }
}).single('newsImg'))

app.use(express.static(path.join(__dirname,'../public')))
app.use(cors())
app.use(express.json())
app.use(htmlRoutes)
app.use(userRoutes)
app.use(likesRoutes)
app.use(commentsRoutes)
app.use(newsRoutes)
app.use(backupRoutes)

export default app
