import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Cources from "./cources.model.js";

let Lesson = sequelize.define("lesson", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    courceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Cources,
            key: "id"
        }
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false
    },
    desc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, { timestamps: true })

Cources.hasMany(Lesson, { foreignKey: "courceId" });
Lesson.belongsTo(Cources, { foreignKey: "courceId" });

export default Lesson