const jwt=require('jsonwebtoken');

const verifyToken=(req,res,next)=>{
    const authHeader=req.params.token;
    if(authHeader){
    let token=authHeader.split(" ")[1];
       jwt.verify(token,'arish123',(err,user)=>{
        req.user=user;
        next();
       })
    }else
    res.status(401).json('you are not authenticated')
}

const verifyTokenAndAdmin=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin)next();
        else
        res.status(403).json("you are not allowed to do that!");
    })
}

module.exports={verifyToken,verifyTokenAndAdmin};