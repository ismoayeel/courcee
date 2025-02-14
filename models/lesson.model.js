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
        allowNull: false
    }
}, { timestamps: true })

// Cources va Lesson o'rtasidagi aloqani o'rnatish
Cources.hasMany(Lesson, { foreignKey: "courceId" }); // Cources ko'plab Lessonsga ega
Lesson.belongsTo(Cources, { foreignKey: "courceId" }); // Har bir Lesson Courcega tegishli

export default Lesson