const services = require("../services/book.services")
const {validationResult } = require('express-validator');
const getAllBooks = async(req,res)=>{
    try{
        const books = await services.getAllBooks();
        res.status(200).send(books)
    }catch(err){
       return res.status(500).send({error:err.message})
    }
}
const getBookById = async(req,res)=>{
    try{
        const id = req.params.id;
        const book = await services.getBookById(id)
        if(!book){
          return res.status(404).send({error:"Book not found"})
        }
        res.status(200).send(book)
    }catch(err){
        return res.status(500).send({error:err.message})
    }
}
const createBook = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  if (!req.file && !req.body.bookCoverImage) {
    return res.status(400).send({ error: "Book cover is required" });
  }

  try {
    const bookData = {
      ...req.body,
      createdBy: req.user.userId,
      bookCoverImage: req.file? req.file.filename : req.body.bookCoverImage,
    };

    const book = await services.createBook(bookData);
    res.status(201).send(book);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};
const searchBook = async(req,res)=>{
    try{
        const {text} = req.query;
        if(!text) {
            const all = await services.getAllBooks();
            return res.status(200).send(all)
        }
        const books = await services.searchBook(text);
        res.status(200).send(books)
    }catch(err){
        res.status(500).send({error:err.message})
    }
}
const updateBook = async(req,res)=>{
    try{
        const updatePayload = { ...req.body };
        if (req.file) {
          updatePayload.bookCoverImage = req.file.filename;
        }
        const updated = await services.updateBook(req.params.id, updatePayload)
        if(!updated){
          return res.status(404).send({error:"Book not found"})
        }
        res.status(200).send(updated)
    }catch(err){
        res.status(500).send({error:err.message})
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
    console.log(req.params.id)
    try{
        
        const book = await services.deleteBook(req.params.id);
        if(!book){
            return res.status(404).send({error:"Book not found"})
        }
        res.status(200).send(book)
    }catch(err){
        return res.status(500).send({error:err.message})
    }
}
module.exports = {
    getAllBooks,
    createBook,
    deleteBook,
    updateBook,
    searchBook,
    filterBook,
    getBookById
}