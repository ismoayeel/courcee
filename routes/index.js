import { Router } from "express";
import userRout from "./user.routes.js";

let mainRoute = Router();

mainRoute.use("/user",userRout );

export default mainRoute