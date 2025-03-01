
const express=require("express");
const router=express.Router();
const userController=require("../controllers/users");
const {check,validationResult}=require('express-validator');
router.post("/register",
    [
        check("name").
        not().
        isEmpty().
        withMessage("name is required"),
        check("email").
        isEmail().
        withMessage("Please enter a valid email "),
        check("password").
        isLength({min:6}).
        withMessage("Password must be atleast 6 characters long"),
        check("preferences").
        optional().
        isArray().
        withMessage("Preferences must be an arrray")
    ],
(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors:errors.array()});
    }
    userController.registerUser(req,res);
    

},


    );
router.post("/login",userController.loginUser);
module.exports=router;
