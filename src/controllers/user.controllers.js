import { User } from "../models/User.js"
import jwt from 'jsonwebtoken'
const secret = 'esteeselsecreto'

//GET all user info
export async function getUsersInfo(req, res) {
    //Recorre todas las filas y genera un arreglo
    try {
        const users = await User.findAll()
        res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

//GET user info
export async function getUserInfo(req, res) {
    try {
        const user = await User.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!user) return res.status(404).json({ message: 'Usuario no existe' })

        res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

//ADD new user
export async function addUser(req, res) {
    try {
        const { username, password } = req.body
        //Validate email
        const user = await User.findOne({
            where: {
                username
            }
        })
        if (user) return res.status(404).json({
            auth: false,
            message: 'Nombre de usuario no disponible'
        })
        //Convert pass
        const encryptPass = await User.encryptPass(password)
        const newUser = await User.create({
            username,
            password: encryptPass
        })
        const { id } = newUser

        //Create token
        const token = jwt.sign({ id }, secret, {
            expiresIn: 60 * 60 * 24
        })

        res.status(201).json({ auth: true, token: token })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

//Login
export async function login(req, res) {
    const { username, password } = req.body
    try {
        const user = await User.findOne({
            where: {
                username
            }
        })
        if (!user) return res.status(404).json({
            auth: false,
            message: 'Usuario no existe'
        })
        const passValid = await User.validatePass(password, user.password)
        if (!passValid) {
            return res.status(401).json({
                auth: false,
                message: 'Contraseña incorrecta'
            })
        }
        //Create token
        const token = jwt.sign({ id: user.id }, secret, {
            expiresIn: 60 * 60 * 24
        })
        res.status(201).json({ auth: true, token: token })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}



