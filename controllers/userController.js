const User =require("../models/userModel")
const createError= require("../utils/createError")

const deleteUser =async (req,res,next)=>{
    const userId = req.params.id;
    try {
         const user = await User.findById(userId)
         if(req.userId !== user._id.toString()) {
              return next(createError(403,"You can delete your account"))
    }
    await User.findByIdAndDelete(userId)
    res.status(200).send("deleted")

    }catch (e){
         console.log(e);
        res.status(500).send( e );
    }

}
const getUser=async (req,res,next)=>{
   try{
        const user = await User.findById(req.params.id)
       res.status(200).send(user)
   }catch (e) {
        console.log(e);
        res.status(500).send(e);
   }
}
module.exports ={
    deleteUser,getUser
}