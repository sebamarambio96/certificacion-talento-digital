import { User } from "../models/User.js"
import { News } from "../models/News.js"
import jwt from 'jsonwebtoken'
const secret = 'esteeselsecreto'

//GET all news
export async function getNews(req, res) {
    //Recorre todas las filas y genera un arreglo
    try {
        const news = await News.findAll()
        res.status(200).json(news)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

//GET news by id
export async function getNewsById(req, res) {
    try {
        const news = await News.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!news) return res.status(404).json({ message: 'Noticia no existe' })

        res.status(200).json(news)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

//ADD news
export async function addNews(req, res) {
    try {
        if (!req.file) return res.status(403).json({ message: 'No hay archivos cargados' })
        const { tittle, body, category_id } = JSON.parse(req.body.data)
        const token = req.headers['x-access-token']
        if (!token) {
            return res.status(401).json({
                auth: false,
                message: 'Debes iniciar sesión para postear una noticia'
            })
        }
        const decoded = jwt.verify(token, secret)
        const { id } = decoded
        const user = await User.findOne(
            {
                where: { id }
            })
        if (!user) return res.status(404).json({ message: 'Debes iniciar sesión para postear una noticia' })
        if (category_id === "Categorías") {
            return res.status(402).json({
                auth: false,
                message: 'Debes elegir una categoria'
            })
        }
        const newNews = await News.create({
            author: id,
            tittle: tittle,
            body: body,
            img: req.file.filename,
            category_id: category_id,
        })
        res.status(201).json({ auth: true, newNews })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

