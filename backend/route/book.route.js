const express = require("express");
const router = express.Router();
const controller = require("../controllers/book.controller")
const {requiredAuth} = require("../middleware/requiredAuth")
const createBookValidator = require("../validators/bookValidator");
const { adminAuthOrOwner } = require("../middleware/adminAuthOrOwner");
const upload = require("../middleware/upload.middleware");

router.get("/",controller.getAllBooks)
router.get("/:id",controller.getBookById)
router.post("/",requiredAuth,upload.single("bookCoverImage"),createBookValidator,controller.createBook)

router.delete("/:id",adminAuthOrOwner,controller.deleteBook)
router.put("/:id",adminAuthOrOwner,controller.updateBook)
router.get("/search",controller.searchBook)
router.get("/filter",controller.filterBook)
module.exports = router