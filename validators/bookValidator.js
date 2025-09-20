const {body} = require("express-validator")

const createBookValidator = [
    body("name").notEmpty().withMessage("Name is required!"),
    body("author").notEmpty().isAlpha("en-US",{ignore:" "}).withMessage("Author must contain only letters"),
    body("price").notEmpty().withMessage("Price is required!").isNumeric().withMessage("Price must be a number")
]

module.exports = createBookValidator