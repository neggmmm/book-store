const repo = require("../repo/userRepo")
const bcrypt = require("bcrypt")
const getAllUsers = async () => {
  return await repo.getAllUsers();
}
const getUserById = async (id) =>{
  return await repo.getUserById(id);
}

const createUser = async (user)=>{
   if(await repo.getUserByEmail(user.email) || await repo.getUserByUsername(user.username)){
    throw new Error("User with this email or username already exists")
   }
   const hashedPassword = await bcrypt.hash(user.password, 10);
   return await repo.createUser({...user,password:hashedPassword})
}
const updateUser = async(id,updatedUser)=>{
    const user = repo.getUserById(id);
  if(!user){
     throw new Error ("User not found");
  }
  return await repo.updateUser(id,updatedUser)
}
const deleteUser = async (id)=>{
  return await repo.deleteUser(id);
}
module.exports ={
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}