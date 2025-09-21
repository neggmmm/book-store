const express = require("express");
const router = express.Router()
const controller = require("../controllers/auth.controller")
const {loginValidator,signupValidator} = require("../validators/authValidator");
const { loginLimiter } = require("../middleware/rateLimiters");
const { requiredAuth } = require("../middleware/requiredAuth");


router.post("/login",loginLimiter,loginValidator,controller.login)

router.post("/register",signupValidator,controller.register)

router.get("/me", requiredAuth, (req, res) => {
  res.json({
    id: req.user.userId,
    username: req.user.username,
    email: req.user.email,
    role: req.user.role
  });
});

module.exports = router