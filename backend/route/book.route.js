const express = require("express");
const router = express.Router();
const controller = require("../controllers/book.controller")
const {adminAuth} = require("../middleware/adminAuth")
const {requiredAuth} = require("../middleware/requiredAuth")
const createBookValidator = require("../validators/bookValidator");

router.get("/",controller.getAllBooks)
router.get("/:id",controller.getBookById)
router.post("/",createBookValidator,requiredAuth,controller.createBook)

router.delete("/:id",adminAuth,controller.deleteBook)
router.put("/:id",adminAuth,controller.updateBook)
router.get("/search",controller.searchBook)
router.get("/filter",controller.filterBook)
module.exports = router