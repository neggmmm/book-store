const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    bookCoverImage: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    genre: {
        type: String,
        default: "General"
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    publishedYear: {
        type: Number,
        min: 1000,
        max: new Date().getFullYear()
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true 
});

const Book = mongoose.model("Book",bookSchema)

module.exports = Book;