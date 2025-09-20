const {verifyToken} = require ("../utils/generateToken")
const requiredAuth = async (req,res,next) =>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).send({error:"Missing access"})
    }

    const token = authHeader.substring(7)
    try{
        const result = await verifyToken(token);
        req.currentUser = {email:result.email}
        next()
    }catch(err){
        res.status(401).send({error:err.message})
    }
}

module.exports = {
    requiredAuth
}