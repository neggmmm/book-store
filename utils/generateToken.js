const jwt = require("jsonwebtoken");
const {MY_SECRET_KEY} = require("../config/envConfig")
const generateToken = (userData) =>{
   return jwt.sign({
        userId: userData._id,     
        username: userData.username,
        email: userData.email,
        role: userData.role,
        },
        MY_SECRET_KEY,
        {expiresIn:"3h"}
    )
}

const verifyToken = (token) =>{
    return jwt.verify(token,MY_SECRET_KEY)
}
module.exports = {
    generateToken,
    verifyToken
}