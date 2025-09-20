
const {verifyToken} = require ("../services/auth.services")

const adminAuth = async (req,res,next) =>{
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(401).send({error:"Missing access"})
         }
        const token = authHeader.substring(7)
        const result = await verifyToken(token);
        if(result.role != "admin"){
            return res.status(403).send({error:"Access denied!"})
        }
        req.currentUser = {email:result.email,role:result.role}
         console.log(req.currentUser)
        next()
    }catch(err){
        res.status(401).send({error:err.message})
    }
}

module.exports = {
    adminAuth
}