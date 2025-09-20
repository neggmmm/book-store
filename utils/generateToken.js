const jwt = require("jsonwebtoken");

const generateToken = (userData) =>{
   return jwt.sign({
        userId: userData._id,     
        username: userData.username,
        email: userData.email,
        role: userData.role
        },
        MY_SECRET_KEY,
        {expiresIn:"3h"}
    )
}

module.exports = {
    generateToken
}