const express = require("express");
const router = express.Router()
const services = require("../services/auth.services")

router.post("/login",async(req,res)=>{
    try{
        if(!req.body.email || !req.body.password){
           return res.status(402).send("All fields are required")
        }
        const result = await services.login(req.body);
        res.status(201).send(result)
    }catch(err){
        res.status(401).send({error:err.message})
    }
})

router.post("/register",async (req,res)=>{
  try{
    if(!req.body){
      return res.status(400).send("all fields are required!")
    }
    const createdUser = await services.register(req.body)
    res.status(201).send(createdUser)
  }catch(err){
    res.status(401).send({error:err})
  }
   
})

module.exports = router