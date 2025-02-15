import { Router } from "express";
import { findAll, findOne, login, register, remove, sendOtp, update, verifyOtp } from "../controllers/user.controller.js";
import verifytoken from "../middleware/verifyToken.js";
import checkRole from "../middleware/rolePolice.js";
import selfpolice from "../middleware/selfPolice.js";
import upload from "../config/multer.js";

let userRout = Router();

userRout.post("/send-otp", sendOtp);
userRout.post("/verify-otp", verifyOtp);
userRout.post("/register", upload.single("image"), register);
userRout.post("/login", login);

userRout.get('/user', verifytoken, checkRole(["admin"]), findAll);
userRout.get("/user/:id", verifytoken, selfpolice(["admin"]), findOne);
userRout.patch("/user/:id", verifytoken, selfpolice(["admin", "user"]), update);
userRout.delete("/user/:id", verifytoken, selfpolice(["admin", "user"]), remove);

export default userRout 