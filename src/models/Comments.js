import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import bcrypt from "bcryptjs";


export const Comments = sequelize.define('comments', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userC: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    newsC: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true
}
)

