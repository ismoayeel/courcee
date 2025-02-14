
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { totp } from "otplib";
import sendMail from "../mailer.js";
import registerValidate from "../validation/user.js";

totp.options = { step: 600, digits: 5 };
const secretKey = process.env.OTPKEY;

async function sendOtp(req, res) {
    try {
        const { email } = req.body;
        const otp = totp.generate(secretKey + email);
        await sendMail(email, otp);  // Emailga OTP jo‘natish

        res.status(200).send({ message: "OTP sent to your email" });
    } catch (error) {
        console.log(error);

    }
}
async function verifyOtp(req, res) {
    try {
        const { email, otp } = req.body;

        const checkOtp = totp.check(otp, secretKey + email);
        if (!checkOtp) {
            return res.status(400).send({ message: "Invalid OTP" }); 
        }

        res.status(200).send({ message: "OTP verified successfully ✅, You can register now" });
    } catch (error) {
        console.log( error);
    }
}


async function register(req, res) {
    try {
        const { error, value } = registerValidate.validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        const { fullname, email, password, role, image, year } = value;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).send({ message: "This account already exists" });
        }

        const hashPassword = bcrypt.hashSync(password, 10);
        await User.create({ fullname, email, password: hashPassword, role, image, year });

        res.status(201).send({ message: "Registered successfully ✅" });
    } catch (error) {
        console.log(error);
        
    }
}


async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(403).send({ message: "Email not found" });
        }

        const comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return res.status(400).send({ message: "Incorrect password" });
        }

        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

        res.status(200).send({ message: "Logged in successfully ✅", access_token: token });
    } catch (error) {
        console.log(error);

    }
}



















async function findAll(req, res) {
    try {
        let users = await User.findAll();
        if (!users.length) {
            return res.status(404).send({ message: "Users not found" });
        }
        res.status(200).send({ data: users });
    } catch (error) {
        console.log(error);

    }
}

async function findOne(req, res) {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send({ data: user });
    } catch (error) {
        console.log("Find One User Error:", error);

    }
}

async function create(req, res) {
    try {
        const { fullname, email, password, role, image, experience, year } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).send({ message: "This account already exists" });
        }

        const hashPassword = bcrypt.hashSync(password, 10);

        const newUser = await User.create({
            fullname,
            email,
            password: hashPassword,
            role,
            image,
            experience,
            year
        });

        res.status(201).send({ message: "User created successfully", data: newUser });
    } catch (error) {
        console.log(error);
    }
}

async function update(req, res) {
    try {
        const { id } = req.params;
        const { fullname, email, role, image, experience, year } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        await user.update({ fullname, email, role, image, experience, year });
        res.status(200).send({ message: "User updated successfully", data: user });
    } catch (error) {
        console.error("Update User Error:", error);
        res.status(500).send({ error_message: error.message });
    }
}

async function remove(req, res) {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        await user.destroy();
        res.status(200).send({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Delete User Error:", error);
        res.status(500).send({ error_message: error.message });
    }
}

export { findAll, findOne, create, update, remove, sendOtp, verifyOtp, register, login };

