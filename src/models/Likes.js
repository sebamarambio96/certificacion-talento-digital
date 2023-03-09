import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import bcrypt from "bcryptjs";


export const Likes = sequelize.define('likes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userL: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    newsL: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    like: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
}, {
    timestamps: true
}
)

