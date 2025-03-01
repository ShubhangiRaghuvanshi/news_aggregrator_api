const User=require("../models/user");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const registerUser= async (req,res)=>{
    const{ name,email,password,role,preferences }= req.body;
    const isExists=await User.findOne({email});
    if (isExists)
    {
        return res.status(400).json({message:"User already exists"});
    }
    
    try{ 
        const hashedPassword= await bcrypt.hash(password,10);
        const newUser=new User({name,
            email,
            password:hashedPassword,
            role,
            preferences});
        
        await newUser.save();

        res.status(201).json({message:"User registered succesfully"});
        
    }
    catch(err)
    {
        console.log(err);
        res.status(400).json({message:"error"});

    }


   
}




const loginUser= async(req,res)=>{
    const{email,password}=req.body;
    const user=await User.findOne({email});
    if(!user)
        return res.status(400).json({message:"User not found"});
   const isValid= await bcrypt.compare(password,user.password);
   if (!isValid) {
    return res.status(400).json({ message: "Invalid password" });
}
   
   
    const token=jwt.sign({id:user._id,email:user.email},process.env.SECRET_KEY,{expiresIn:"1h"});
    res.status(200).json({message:"User Logged In ",token});
   
}
module.exports={ registerUser,loginUser };