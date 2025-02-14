import { Router } from "express";
import { create, findAll, findBySearch, findOne, remove, update } from "../controllers/comment.controller.js";

const commentRoute = Router()

commentRoute.get("/comment", findAll)
commentRoute.get("/comment", findBySearch)
commentRoute.get("/comment/:id", findOne)
commentRoute.post("/comment", create)
commentRoute.patch("/comment/:id", update)
commentRoute.delete("/comment/:id", remove)

export default commentRoute