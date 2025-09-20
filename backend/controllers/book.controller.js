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
    if(!errors.isEmpty()){
        return res.status(400).send({errors:errors.array()})
    } 
    try{
        console.log(req)
         const bookData = {...req.body,createdBy:req.user.userId};
        
        const book = await services.createBook(bookData);
        res.status(201).send(book)

    }catch(err){
       return res.status(401).send({error:err.message})
    }
}
const searchBook = async(req,res)=>{
    try{
        const {text} = req.query;
        if(!text) {
            res.status(201).send(await services.getAllBooks())
        }
        const books = await services.searchBook(text);
        res.status(201).send(books)
    }catch(err){
        res.status(401).send({error:err.message})
    }
}
const updateBook = async(req,res)=>{
    try{
        const updated = await services.updateBook(req.params.id,req.body)
        res.status(201).send(updated)
    }catch(err){
        res.status(400).send({error:err.message})
    }
    
}
const filterBook = async (req, res) => {
  try {
    const filters = req.query;
    const books = await services.filterBook(filters);
    res.status(200).send(books);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
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
    deleteBook,
    updateBook,
    searchBook,
    filterBook
}