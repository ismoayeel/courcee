import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Category from "./category.model.js";
import User from "./user.model.js";

let Cources = sequelize.define("cources", {
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
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: "id"
        }
    },
    teacherId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        },
        onDelete: "CASCADE"
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, { timestamps: true })

Category.hasMany(Cources, { foreignKey: "categoryId" });
Cources.belongsTo(Category, { foreignKey: "categoryId" });

User.hasMany(Cources, { foreignKey: "teacherId" });
Cources.belongsTo(User, { foreignKey: "teacherId" });

export default Cources