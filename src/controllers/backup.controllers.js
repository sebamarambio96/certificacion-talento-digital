import * as fs from 'fs';
import { Categories } from '../models/Categories.js';



//ADD all products
export async function backup(req, res) {
    try {
        //categories BACKUP
    let categories = ["Juegos", "Anime", "Japón"]
    categories.map(async namecategory => {
        await Categories.create({
            namecategory
        })
    })
    /* //products BACKUP
    let dataProducts = fs.readFileSync('./public/data/products.json')
    let products = JSON.parse(dataProducts)
    await Products.bulkCreate(products) */
    res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
