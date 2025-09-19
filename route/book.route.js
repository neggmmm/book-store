const express = require("express");
const services = require("../services/book.services")
const router = express.Router();
const {adminAuth} = require("../middleware/adminAuth")
router.get("/",adminAuth,async(req,res)=>{
    try{
        const books = await services.getAllBooks();
        res.status(201).send(books)
    }catch(err){
       return res.status(401).send({error:err})
    }
})


router.post("/",async(req,res)=>{
    try{
        if(!req.body.name || !req.body.author || !req.body.price){
           return res.status(401).send({error:"All fields are required"})
        }
        const book = await services.createBook(req.body);
        res.status(201).send(book)

    }catch(err){
       return res.status(401).send({error:err})
    }
})

router.delete("/:id",adminAuth,async(req,res)=>{
    try{
        const book = await services.deleteBook(req.params.id);
        res.status(201).send(book)
    }catch(err){
        return res.status(401).send({error:err})
    }
})

module.exports = router