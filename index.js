import express from "express"
import dotenv from "dotenv"
import sequelize from "./config/db.js";
import mainRoute from "./routes/index.js";

dotenv.config()

let app = express()
app.use(express.json())

let PORT = process.env.PORT

app.use("/", mainRoute)

async function bootstrap() {
    try {
        await sequelize.authenticate()
        // await sequelize.sync({ force: true })
        console.log("db connected");
        app.listen(PORT, () => {
            console.log(`server started on port: ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

bootstrap()