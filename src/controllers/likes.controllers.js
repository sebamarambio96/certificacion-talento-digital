import { User } from "../models/User.js"
import { Likes } from "../models/Likes.js"
import jwt from 'jsonwebtoken'
const secret = 'esteeselsecreto'

//GET likes by id
export async function getLikes(req, res) {
    try {
        const data = await Likes.findAll(
            {
                where: {
                    newsL: req.params.id
                }
            }
        )
        res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

//PUT like
export async function putLike(req, res) {
    try {
        const { userL, newL, like} = req.body
        const token = req.headers['x-access-token']
        if (!token) {
            return res.status(401).json({
                auth: false,
                message: 'Debes iniciar sesión para dar like'
            })
        }
        const decoded = jwt.verify(token, secret)
        const { id } = decoded
        const user = await User.findOne({ where: { id } })
        if (!user) return res.status(404).json({ message: 'Debes iniciar sesión para dar like' })

        const userLValidate = await Likes.findOne({
            where: {
                userL
            }
        })

        if (!userLValidate) {
            const newLike = await Likes.create({
                userL, 
                newL, 
                like
            })
            res.status(201).json({ auth: true, newLike })
        } else {
            userLValidate.like = like
            await userLValidate.save()
            res.status(201).json({ auth: true, message: "Like actualizado" })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}