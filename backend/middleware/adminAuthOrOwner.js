

const {verifyToken} = require ("../utils/generateToken")
const BookModel = require("../model/book.model")
exports.adminAuthOrOwner =async (req,res,next) =>{
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(401).send({error:"You dont have access!"})
        }
        const token = authHeader.substring(7)
        const result = await verifyToken(token);
        
        
        const book = await BookModel.findById(req.params.id);

        if (!book) {
             return res.status(404).send({ error: "Book not found" });
        }   
        console.log(book.createdBy.toString())
        console.log(result.userId)
        if(result.userId === book.createdBy.toString() || result.role === "admin"){
            req.currentUser = {id:result.id,role:result.role}
            return next()
        }
         return res.status(403).send({error:"Access denied!"})
    }catch(err){
        return res.status(500).send({error:err.message})
    }
}