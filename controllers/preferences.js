
const user=require("../models/user");
const getPreferences= async(req,res)=>{
    try{
        const dbuser=await user.findById(req.user.id);
        console.log(dbuser);
        if(!dbuser)
        {
            return res.status(400).json({message:"User not found"});
}
        res.status(200).json({preferences:dbuser.preferences});


    }
    catch(err)
    {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}


const updatePreferences=async (req,res)=>{
    const {preferences}=req.body;
    try{

        const dbuser=await user.findById(req.user.id);
        if (!dbuser) {
            return res.status(404).json({ message: "User not found" });
        }
   dbuser.preferences=preferences;
  await dbuser.save();
  console.log(dbuser);
        res.status(200).json({ message: "Preferences updated successfully"});



    }
    catch(err)
    {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}
module.exports={getPreferences,updatePreferences};