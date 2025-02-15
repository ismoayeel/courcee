import { Router } from "express";
import categoryRoute from "./category.routes.js";
import commentRoute from "./comment.routes.js";
import courcesRoute from "./cources.routes.js";
import lessonRoute from "./lesson.routes.js";
import userRout from "./user.routes.js";

const mainRoute = Router()

mainRoute.use("/", categoryRoute)
mainRoute.use("/", commentRoute)
mainRoute.use("/", courcesRoute)
mainRoute.use("/", lessonRoute)
mainRoute.use("/", userRout);

export default mainRoute