const BookModel = require("../model/book.model")

const getAllBooks =async() =>{
    return await BookModel.find();
}
const getBookById = async(id)=>{
  return await BookModel.findById(id);
}

const updateBook = async(id,updated) =>{
  return await BookModel.findByIdAndUpdate(id,updated)
}
const createBook = async (book) =>{
    const newBook = new BookModel (book)
    return await newBook.save()
}

const searchBook = async (text) => await BookModel.find({
  $or: [
    { title: new RegExp(text, "i") },
    { genre: new RegExp(text, "i") },
    { description: new RegExp(text, "i") }
  ]
});

const filterBook = async (filter) => {
  let query = {};

  if (filter.genre) {
    query.genre = new RegExp(filter.genre, "i")
  }
  if (filter.minPrice || filter.maxPrice) {
    query.price = {}
    if (filter.minPrice) query.price.$gte = Number(filter.minPrice)
    if (filter.maxPrice) query.price.$lte = Number(filter.maxPrice)
  }

  return await BookModel.find(query);
}

const deleteBook = async (id) => await BookModel.findByIdAndDelete(id);

module.exports = {
    getAllBooks,
    getBookById,
    updateBook,
    createBook,
    deleteBook,
    searchBook,
    filterBook
}