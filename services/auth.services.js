const repo = require("../repo/userRepo")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {MY_SECRET_KEY} = require("../config/envConfig")
console.log(MY_SECRET_KEY)
const login =async (userData)=>{
    try{
        if(!userData.email || !userData.password){
        throw new Error("Email & password are required")
    }

    const user = await repo.getUserByEmail(userData.email);
    if(!user){
        throw new Error("Invalid Email or password")
    }

    const isValidpassword = await bcrypt.compare(userData.password,user.password);
    if(!isValidpassword){
        throw new Error("Invalid Email or password ")
    }

    const token = generateToken(user)
    return {token: `Bearer ${token}`}

    }catch(err){
        return {error:err.message}
    }
}

const register = async(userData)=>{
    try{
        if(!userData.username || !userData.email || !userData.password){
        throw Error("all fields are required!")
    }
    const user = await repo.getUserByEmail(userData.email);
    if(user){
        throw new Error("Cannot create a new account!")
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = await repo.createUser({...userData,password:hashedPassword});

    const {password, ...userWithoutPassword} = newUser.toObject();
    return userWithoutPassword;

    }catch(err){
        return {error:err.message}
    }
}

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
const verifyToken = (token) =>{
    return jwt.verify(token,MY_SECRET_KEY)
}
module.exports = {
    login,
    register,
    verifyToken
}