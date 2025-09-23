const {body} = require("express-validator")

const createBookValidator = [
    body("title").notEmpty().withMessage("title is required!"),
    body("price").notEmpty().withMessage("Price is required!").isNumeric().withMessage("Price must be a number"),
    body("genre").notEmpty().withMessage("Category is required!")
]

module.exports = createBookValidator