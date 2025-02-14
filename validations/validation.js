import joi from "joi"

const categoryValidation = joi.object({
    name: joi.string().min(4).required(),
    desc: joi.string().required()
})

const commentValidation = joi.object({
    user_id: joi.number().required(),
    msg: joi.string().required(),
    star: joi.number().required(),
    courceId: joi.number().required()
})

const courceValidation = joi.object({
    name: joi.string().min(4).required(),
    desc: joi.string().required(),
    categoryId: joi.number().required(),
    teacherId: joi.number().required(),
    image: joi.string().required()
})

const lessonValidation = joi.object({
    name: joi.string().min(4).required(),
    courceId: joi.number().required(),
    link: joi.string().required(),
    desc: joi.string().required(),
    image: joi.string().required()
})

export { categoryValidation, commentValidation, courceValidation, lessonValidation }