const {body} = require("express-validator");

const loginValidator = [
    body("email").notEmpty().withMessage("Email field is required").isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required")
]

const signupValidator = [
    body("username").notEmpty().withMessage("Username field is required").isLength({ min: 4, max: 15 }).withMessage("Username must be between 4 and 15 characters"),
    body("email").notEmpty().withMessage("Email field is required").isEmail().withMessage("Please insert valid Email"),
    body("password").notEmpty().withMessage("Password is required").isLength({ min: 6, max: 20 }).withMessage("Password must be between 6 and 20 characters")
]

module.exports ={
    loginValidator,
    signupValidator
}