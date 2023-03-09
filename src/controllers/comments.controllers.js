import { Comments } from "../models/Comments.js"
import jwt from 'jsonwebtoken'
import { User } from "../models/User.js"
const secret = 'esteeselsecreto'

//GET comments by id
export async function getComments(req, res) {
    try {
        const comments = await Comments.findAll(
            {
                where: {
                    newC: req.params.id
                }
            }
        )
        res.status(200).json(comments)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


//ADD comments
export async function addComment(req, res) {
    try {
        const { newsC, comment} = req.body
        console.log(req.body)
        const token = req.headers['x-access-token']
        if (!token) {
            return res.status(401).json({
                auth: false,
                message: 'No estás autorizado'
            })
        }
        const decoded = jwt.verify(token, secret)
        const { id } = decoded
        const user = await User.findOne({ where: { id } })
        if (!user) return res.status(404).json({ message: 'Debes iniciar sesión para comentar' })
        const newComments = await Comments.create({
            userC:id,
            newsC, 
            comment
        })
        res.status(201).json({ auth: true, newComments })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

function renderComments () {
    const commentContainer = document.getElementById('elementId');
    while (containerCompras.firstChild) {
        containerCompras.removeChild(containerCompras.firstChild);
    }
}

