const repo = require("../repo/bookRepo")
const getAllBooks =async()=>{
    return await repo.getAllBooks();
}

const createBook =async (book) =>{
    return await repo.createBook(book);
}

const deleteBook = async (id) =>{
    return await repo.deleteBook(id);
}
module.exports ={getAllBooks,
    createBook,
    deleteBook
}