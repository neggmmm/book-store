const express = require("express");
const router = express.Router();
const controller = require("../controllers/book.controller")
const {adminAuth} = require("../middleware/adminAuth")

const createBookValidator = require("../validators/bookValidator");

router.get("/",adminAuth,controller.getAllBooks)

router.post("/",createBookValidator,controller.createBook)

router.delete("/:id",adminAuth,controller.deleteBook)

router.get("/search",controller.searchBook)

module.exports = router