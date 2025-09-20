const services = require("../services/auth.services")
const {validationResult} = require("express-validator")

const login = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(400).send({errors:errors.array()})
    try{
        const result = await services.login(req.body);
        res.status(201).send(result)
    }catch(err){
       return res.status(401).send({error:err.message})
    }
}

const register = async (req,res)=>{
  const errors = validationResult(req)
  if(!errors.isEmpty()) return res.status(400).send({errors:errors.array()})
  try{
    const createdUser = await services.register(req.body)
    res.status(201).send(createdUser)
  }catch(err){
    res.status(401).send({error:err})
  }
   
}


module.exports = {
    register,
    login
}