import { Router } from "express";
import {  create, findAll, findOne, login, register, remove, sendOtp, update, verifyOtp } from "../controllers/user.controller.js";
import verifytoken from "../middleware/verifyToken.js";
import checkRole from "../middleware/rolePolice.js";
import selfpolice from "../middleware/selfPolice.js";


let userRout = Router();

userRout.post("/send-otp", sendOtp);      
userRout.post("/verify-otp", verifyOtp);  
userRout.post("/register", register);    
userRout.post("/login", login);

userRout.get('/', verifytoken, checkRole(["admin"]), findAll);
userRout.get("/:id", verifytoken, selfpolice(["admin"]), findOne);
userRout.post("/", verifytoken, checkRole(["admin"]), create);
userRout.patch("/:id", verifytoken, selfpolice(["admin"]), update);
userRout.delete("/:id", verifytoken, selfpolice(["admin"]), remove);



export default userRout 






