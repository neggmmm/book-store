const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        required:true,
        type:String,
    },
    email:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }, 
    role:{
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
})

const User = mongoose.model("User",userSchema);

module.exports = User;