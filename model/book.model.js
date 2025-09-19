const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    author:{
        required:true,
        type:String
    },
    price:{
        required:true,
        type:Number
    }
})

const Book = mongoose.model("Book",bookSchema)

module.exports = Book;