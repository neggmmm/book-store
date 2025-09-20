const repo = require("../repo/userRepo")
const jwt = require("jsonwebtoken")
const {generateToken} = require("../utils/generateToken")
const { hashPassword, comparePassword} = require("../utils/hashPassword")
const login =async (userData)=>{
    try{
        if(!userData.email || !userData.password){
        throw new Error("Email & password are required")
    }

    const user = await repo.getUserByEmail(userData.email);
    if(!user){
        throw new Error("Invalid Email or password")
    }

    const isValidpassword =await comparePassword(userData.password,user.password)
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
    const user = await repo.getUserByEmail(userData.email);
    if(user){
        throw new Error("Cannot create a new account!")
    }
    const hashedPassword =await hashPassword(userData.password)
    const newUser = await repo.createUser({...userData,password:hashedPassword});

    const {password, ...userWithoutPassword} = newUser.toObject();
    return userWithoutPassword;

    }catch(err){
        return {error:err.message}
    }
}


module.exports = {
    login,
    register
}