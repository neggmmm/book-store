const services = require("../services/book.services")
const {validationResult } = require('express-validator');
const getAllBooks = async(req,res)=>{
    try{
        const books = await services.getAllBooks();
        res.status(201).send(books)
    }catch(err){
       return res.status(401).send({error:err})
    }
}

const createBook = async(req,res)=>{
    const errors = validationResult(req)
    if(errors.isEmpty()) return res.status(400).send({errors:errors.array()})
    try{
        const book = await services.createBook(req.body);
        res.status(201).send(book)

    }catch(err){
       return res.status(401).send({error:err})
    }
}

const deleteBook = async(req,res)=>{
    try{
        const book = await services.deleteBook(req.params.id);
        res.status(201).send(book)
    }catch(err){
        return res.status(401).send({error:err})
    }
}
module.exports = {
    getAllBooks,
    createBook,
    deleteBook

}