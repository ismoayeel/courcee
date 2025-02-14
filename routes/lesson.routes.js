import { Router } from "express";
import { create, findAll, findBySearch, findOne, remove, update } from "../controllers/lesson.controller.js";

const lessonRoute = Router()

lessonRoute.get("/lesson", findAll)
lessonRoute.get("/lesson", findBySearch)
lessonRoute.get("/lesson/:id", findOne)
lessonRoute.post("/lesson", create)
lessonRoute.patch("/lesson/:id", update)
lessonRoute.delete("/lesson/:id", remove)

export default lessonRoute