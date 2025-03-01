const jwt=require("jsonwebtoken");
const express=require('express');
const router=express.Router();
require("dotenv").config();
const authMiddleware= async(req,res,next)=>{

    const token = req.header("Authorization") && req.header("Authorization").split(" ")[1];
    if(!token)
        return res.status(400).json({message:"Invalid token"});
    try{
    const decoded=jwt.verify(token,process.env.SECRET_KEY);
    console.log(decoded);
    req.user=decoded;
    next();
    }
    catch(err)
    {
res.status(400).json({message:"Invalid Token"});
    }
}
module.exports=authMiddleware;