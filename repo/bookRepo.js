const BookModel = require("../model/book.model")

const getAllBooks =async() =>{
    return await BookModel.find();
}

const createBook = async (book) =>{
    const newBook = new BookModel ({
        name: book.name,
        author: book.author,
        price: book.price
    })
    return await newBook.save()
}

const deleteBook = async (id) => await BookModel.findByIdAndDelete(id);

module.exports = {
    getAllBooks,
    createBook,
    deleteBook
}