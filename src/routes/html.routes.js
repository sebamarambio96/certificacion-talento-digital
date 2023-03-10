import { Router } from "express";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router()

//ROUTES

router.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname,"../../public/index.html"))
})

router.get('/index.html', async (req, res) => {
    res.sendFile(path.join(__dirname,"../../public/index.html"))
})

router.get('/admin.html', async (req, res) => {
    res.sendFile(path.join(__dirname,"../../public/pages/admin.html"))
})
router.get('/login.html', async (req, res) => {
    res.sendFile(path.join(__dirname,"../../public/pages/login.html"))
})

router.get('/signUp.html', async (req, res) => {
    res.sendFile(path.join(__dirname,"../../public/pages/signUp.html"))
})

router.get('/news', async (req, res) => {
    res.sendFile(path.join(__dirname,"../../public/pages/news.html"))
})

router.get('/btnLogin.js', async (req, res) => {
    res.sendFile(path.join(__dirname,"../../public/js/btnLogin.js"))
})



//EXPORT
export default router