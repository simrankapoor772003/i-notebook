const { header } = require('express-validator')
var jwt=require('jsonwebtoken')

const JWT_SECRET="Iamagoodgirl"
const fetchuser=(req,res,next)=>{
    const token=req.header('auth-token')
    if(!token) resizeBy.status(400).send("Please authenticate yourself")
    try{
        const data=jwt.verify(token,JWT_SECRET)
        req.user=data.user
        next();
    }
    catch(error){
        res.status(500).send("Some error occured")
    }
}
module.exports=fetchuser