const express = require("express")
const router = express.Router();
const controller = require("../controllers/user.controller")
const {adminAuth} = require("../middleware/adminAuth");
const { requiredAuth } = require("../middleware/requiredAuth");


router.get("/", adminAuth,controller.getAllUsers)

router.get("/:id",requiredAuth, controller.getUserById)

router.post("/",adminAuth,controller.createUser)

router.put("/:id",adminAuth,controller.updateUser)

router.delete("/:id",adminAuth,controller.deleteUser)

module.exports =  router