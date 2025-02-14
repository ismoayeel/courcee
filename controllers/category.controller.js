import Category from "../models/category.model.js";
import { categoryValidation } from "../validations/validation.js";

async function findAll(req, res) {
    try {
        let data = await Category.findAll()
        res.send(data)
    } catch (error) {
        console.log(error);
    }
};
async function findBySearch(req, res) {
    try {
        let query = req.query;
        let keys = Object.keys(query);
        let values = Object.values(query);
        let newObj = {};
        values.forEach((val, index) => {
            if (val) {
                newObj[keys[index]] = val;
            }
        });
        console.log(newObj);
        let data = await Category.findAll({ where: obj });
        res.send(data)
    } catch (error) {
        console.log(error);
    }
};
async function findOne(req, res) {
    try {
        let { id } = req.params
        let data = await Category.findByPk(id)
        res.send(data)
    } catch (error) {
        console.log(error);
    }
};
async function create(req, res) {
    try {
        let { error, value } = categoryValidation.validate(req.body)
        if (error) {
            return res.send(error.details[0].message)
        }
        await Category.create(req.body)
        res.send("created successfully ✅")
    } catch (error) {
        console.log(error);
    }
};
async function update(req, res) {
    try {
        let data = await Category.update(req.body, { where: { id: req.params.id } })
        res.send("updated successfully ✅")
    } catch (error) {
        console.log(error);
    }
};
async function remove(req, res) {
    try {
        let data = await Category.destroy({ where: { id: req.params.id } })
        res.send(data)
    } catch (error) {
        console.log(error);
    }
};

export { findAll, findBySearch, findOne, create, update, remove }