const repo = require("../repo/bookRepo")
const getAllBooks =async()=>{
    const books =await repo.getAllBooks();
    return books
}


const createBook =async (book) =>{
    const newBook = await repo.createBook(book);
    return newBook
}

const deleteBook = async (id) =>{
    return await repo.deleteBook(id);
}
module.exports ={getAllBooks,
    createBook,
    deleteBook
}