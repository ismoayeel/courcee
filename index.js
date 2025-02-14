import express from "express"
import dotenv from "dotenv"
import sequelize from "./config/db.js";

dotenv.config()

let app = express()
app.use(express.json())

async function bootstrap() {
    try {
        await sequelize.sync({ force: true })
        console.log("db connected");
        app.listen(process.env.PORT, () => {
            console.log("server started on port: 3000");
        })
    } catch (error) {
        console.log(error);
    }
}

bootstrap()
