const UserModel = require("../model/user.model")

const getAllUsers = async ()=> await UserModel.find();

const getUserById =async (id) => await UserModel.findById(id)

const getUserByEmail = async (email) => await UserModel.findOne({email})

const getUserByUsername = async (username) =>await UserModel.findOne({username})

const updateUser = async (id,updated) => await UserModel.findByIdAndUpdate(id,updated)

const deleteUser = async (id) => await UserModel.findByIdAndDelete(id);

const createUser = async (user) =>{
    const userModel = new UserModel({
        email: user.email,
        password: user.password,
        username: user.username
    })
   
    return await userModel.save()
}

module.exports = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    getUserByUsername,
    createUser,
    updateUser,
    deleteUser
}