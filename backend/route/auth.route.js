const express = require("express");
const router = express.Router()
const controller = require("../controllers/auth.controller")
const {loginValidator,signupValidator} = require("../validators/authValidator");
const { loginLimiter } = require("../middleware/rateLimiters");


router.post("/login",loginLimiter,loginValidator,controller.login)

router.post("/register",signupValidator,controller.register)

module.exports = router