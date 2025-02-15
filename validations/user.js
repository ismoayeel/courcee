import Joi from "joi";

const registerValidate = Joi.object({
    fullname: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("admin", "teacher", "student").required(),
    image: Joi.string().optional(),
    year: Joi.number().required(),
    experience: Joi.number().optional()
});

export default registerValidate