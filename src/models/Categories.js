import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { News } from "./News.js";


export const Categories = sequelize.define('categories', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    namecategory: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: false
}
)

//News
Categories.hasMany(News, {
    foreignKey: 'category_id',
    sourceKey: 'id',
})

News.belongsTo(Categories, {
    foreignKey: 'category_id',
    targetId: 'id'
})
