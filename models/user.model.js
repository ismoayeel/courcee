import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define("users", {
id:{
    type: DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true,
    allowNull:false
},
fullname:{
    type: DataTypes.STRING,
    allowNull:false
},
email:{
    type:DataTypes.STRING,
    allowNull:false
},
password:{
    type:DataTypes.STRING,
    allowNull:false
},
year:{
    type:DataTypes.INTEGER,
    allowNull:false
},
experience:{
    type: DataTypes.STRING,
    allowNull:true
},
image:{
    type: DataTypes.STRING,
    allowNull:true
},
role:{
    type: DataTypes.ENUM("admin", "techer", "student"),
    allowNull:false
}   

});

export default User