import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { News } from "./News.js";
import { Comments } from "./Comments.js";
import { Likes } from "./Likes.js";
import bcrypt from "bcryptjs";


export const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: true
}
)

// Class Method
User.encryptPass = async function (password) {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
};

User.validatePass = async function (pass, passDB) {
    return bcrypt.compare(pass, passDB)
};

//News
User.hasMany(News, {
    foreignKey: 'author',
    sourceKey: 'id',
})

News.belongsTo(User, {
    foreignKey: 'author',
    sourceKey: 'id'
})
//Comments
User.hasMany(Comments, {
    foreignKey: 'userC',
    sourceKey: 'id',
})

Comments.belongsTo(User, {
    foreignKey: 'userC',
    sourceKey: 'id'
})
//Likes
User.hasMany(Likes, {
    foreignKey: 'userL',
    sourceKey: 'id',
})

Likes.belongsTo(User, {
    foreignKey: 'userL',
    sourceKey: 'id'
})