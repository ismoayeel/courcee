import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Cources from "./cources.model.js";
import User from "./user.model.js";

let Comment = sequelize.define("comment", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        },
        onDelete: "CASCADE"
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

User.hasMany(Comment, { foreignKey: "user_id" });
Comment.belongsTo(User, { foreignKey: "user_id" });

Cources.hasMany(Comment, { foreignKey: "courceId" });
Comment.belongsTo(Cources, { foreignKey: "courceId" });

export default Comment