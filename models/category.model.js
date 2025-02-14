import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

let Category = sequelize.define("category", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    desc: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: true })

export default Category