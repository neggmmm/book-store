const express = require("express")
const router = express.Router();
const controller = require("../controllers/user.controller")
const {adminAuth} = require("../middleware/adminAuth")

router.use(adminAuth)

router.get("/", controller.getAllUsers)

router.get("/:id", controller.getUserById)

router.post("/",controller.createUser)

router.put("/:id",controller.updateUser)

router.delete("/:id",controller.deleteUser)

module.exports =  router