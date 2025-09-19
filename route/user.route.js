const express = require("express")
const router = express.Router();
const services = require("../services/user.services")
const {requiredAuth} = require("../middleware/requiredAuth")
const {adminAuth} = require("../middleware/adminAuth")
router.use(requiredAuth)
router.get("/", async(req,res)=>{
   try {
    const users = await services.getAllUsers();
    res.send(users);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
})

router.get("/:id",adminAuth, async(req,res)=>{
   try {
    const user = await services.getUserById(req.params.id);
    res.send(user);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
})

router.post("/",async(req,res)=>{
    try{
    if(!req.body.email || !req.body.username || !req.body.password){
        return res.status(400).json({error: "Email, username, and password are required"})
    }
      const created = await services.createUser(req.body)
      res.status(201).send(created)
    }catch(err){
      res.status(500).send({error:err.message})
    }
})

router.put("/:id",adminAuth,async(req,res)=>{
  try{
     const updated =await services.updateUser(req.params.id,req.body)
     return res.status(201).send(updated)
  }catch(err){
    res.status(500).send({error:err.message})
  }
})

router.delete("/:id",adminAuth,async (req,res)=>{
    try{
      const user = await services.deleteUser(req.params.id);
      res.send(user)
    }catch(err){
      res.status(500).send({error:err.message})
    }
})

module.exports =  router