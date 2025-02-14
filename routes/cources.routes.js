import { Router } from "express";
import { create, findAll, findBySearch, findOne, remove, update } from "../controllers/cources.controller.js";

const courcesRoute = Router()

courcesRoute.get("/cources", findAll)
courcesRoute.get("/cources", findBySearch)
courcesRoute.get("/cources/:id", findOne)
courcesRoute.post("/cources", create)
courcesRoute.patch("/cources/:id", update)
courcesRoute.delete("/cources/:id", remove)

export default courcesRoute