const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require("../utils/createError");

const register = async (req, res) => {
    try {
        const hash = bcrypt.hashSync(req.body.password, 12);
        const newUser = new User({
            ...req.body,
            password: hash
        });
        await newUser.save();
        res.status(201).send(newUser);
    } catch (e) {
        res.status(500).send(e);
    }
};
const login =async (req,res,next) => {
    try{
        const {username,password}=req.body
        const user =await User.findOne({username: username})

        if(!user) return next(createError(404,"User not found"))

        const isCorrect = bcrypt.compareSync(password,user.password)
        if(!isCorrect)
            return next(createError(400,"Wrong pasword or user name"))
        const token = jwt.sign(
            {
                id :user._id,
                isSeller:user.isSeller
            },"ABCD")
        // const {password,...info} =user._doc
        res.status(200).send(token)
      //   res
      // .cookie("accessToken", token, {
      //   httpOnly: true,
      // })
      // .status(200)
      // .send(info);
    }
    catch (err){
        next(err)
    }
}
const logout =async (req,res)=>{
         res
         //     .clearCookie("access taken",{
         //     sameSite:"None",
         //     secure:true
         // })
             .status(200)
             .send("Succesfully logout")
}


module.exports = {
    register,login,logout
};
