import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Category from "./category.model.js";

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
        // references: {
        //     model: User,
        //     key: "id"
        // },
        // onDelete: "CASCADE"
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: true })

// Kategoriyalar va Cources o'rtasidagi aloqani o'rnatish
Category.hasMany(Cources, { foreignKey: "categoryId" }); // Category ko'plab Courcesga ega
Cources.belongsTo(Category, { foreignKey: "categoryId" }); // Har bir Cource Categoryga tegishli

// Foydalanuvchi va Cources o'rtasidagi aloqani o'rnatish
User.hasMany(Cources, { foreignKey: "teacherId" }); // User ko'plab Courcesga ega
Cources.belongsTo(User, { foreignKey: "teacherId" }); // Har bir Cource foydalanuvchiga tegishli (teacher)

export default Cources