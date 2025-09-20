const bcrypt = require("bcrypt");

exports.hashPassword = (password) =>  bcrypt.hash(password, 10)

exports.comparePassword =  (plain, hashed) =>bcrypt.compare(plain, hashed)
