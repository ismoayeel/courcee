import { Router } from "express";
import { create, findAll, findBySearch, findOne, remove, update } from "../controllers/cources.controller.js";
import upload from "../config/multer.js";

const courcesRoute = Router()

courcesRoute.get("/cources", findAll)
courcesRoute.get("/cources", findBySearch)
courcesRoute.get("/cources/:id", findOne)
courcesRoute.post("/cources", upload.single("image"), create)
courcesRoute.patch("/cources/:id", update)
courcesRoute.delete("/cources/:id", remove)

export default courcesRoute