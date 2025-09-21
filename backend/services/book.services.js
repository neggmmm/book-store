const repo = require("../repo/bookRepo")
const getAllBooks =async()=>{
    return await repo.getAllBooks();
}

const createBook =async (book) =>{
    return await repo.createBook(book);
}
const getBookById= async(id) =>{
    return await repo.getBookById(id)
}
const updateBook = async(id,updated) =>{
    const book = await repo.getBookById(id);
    if(!book){
        throw new Error("Book Not Found")
    }
    return await repo.updateBook(id,updated)
}
const searchBook = async(text)=>{
    return await repo.searchBook(text)
}

const filterBook = async (filter) => {
  return await repo.filterBook(filter);
};

const deleteBook = async (id) =>{
    return await repo.deleteBook(id);
}
module.exports ={getAllBooks,
    createBook,
    deleteBook,
    updateBook,
    searchBook,
    filterBook,
    getBookById
}