const services = require("../services/user.services")

const getAllUsers = async(req,res)=>{
   try {
    const users = await services.getAllUsers();
    res.send(users);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

const getUserById = async(req,res)=>{
   try {
    const user = await services.getUserById(req.params.id);
    res.send(user);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}


const createUser = async(req,res)=>{
    try{
      const created = await services.createUser(req.body)
      res.status(201).send(created)
    }catch(err){
      res.status(500).send({error:err.message})
    }
}

const updateUser =async(req,res)=>{
  try{
     const updated =await services.updateUser(req.params.id,req.body)
     return res.status(201).send(updated)
  }catch(err){
    res.status(500).send({error:err.message})
  }
}

const deleteUser = async (req,res)=>{
    try{
      const user = await services.deleteUser(req.params.id);
      res.send(user)
    }catch(err){
      res.status(500).send({error:err.message})
    }
}
module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}