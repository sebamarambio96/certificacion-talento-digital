import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Comments } from "./Comments.js";
import { Likes } from "./Likes.js";


export const News = sequelize.define('news', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tittle: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    body: {
        type: DataTypes.STRING(4000),
        allowNull: false
    },
    img: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true
}
)

//Comments
News.hasMany(Comments, {
    foreignKey: 'newsC',
    sourceKey: 'id',
})

Comments.belongsTo(News, {
    foreignKey: 'newsC',
    sourceKey: 'id'
})

//Likes
News.hasMany(Likes, {
    foreignKey: 'newsL',
    sourceKey: 'id',
})

Likes.belongsTo(News, {
    foreignKey: 'newsL',
    sourceKey: 'id'
})