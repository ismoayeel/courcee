import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Cources from "./cources.model.js";

let Comment = sequelize.define("comment", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //     model: User,
        //     key: "id"
        // },
        // onDelete: "CASCADE"
    },
    msg: {
        type: DataTypes.STRING,
        allowNull: false
    },
    star: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    courceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Cources,
            key: "id"
        }
    }
}, { timestamps: true })

// Foydalanuvchi va Komment o'rtasidagi aloqani o'rnatish
User.hasMany(Comment, { foreignKey: "user_id" }); // User ko'plab kommentlarga ega
Comment.belongsTo(User, { foreignKey: "user_id" }); // Har bir komment foydalanuvchiga tegishli

// Kurs va Komment o'rtasidagi aloqani o'rnatish
Cources.hasMany(Comment, { foreignKey: "courceId" }); // Cources ko'plab kommentlarga ega
Comment.belongsTo(Cources, { foreignKey: "courceId" }); // Har bir komment kursga tegishli

export default Comment