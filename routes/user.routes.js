const {Router} = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config();
const {UserModel} = require("../models/user.model")

const userController = Router();

userController.post("/signup", (req, res)=>{
    const {email, password, age } = req.body;
   
    bcrypt.hash(password, 5, async function(err, hash){
       if(err){
        res.send("Oops! Something went wrong")
       }

       const user  = new UserModel({
        email,
        password:hash,
        age
       })
       await user.save();
       res.send("Signup Successful!")
    })    
})

userController.post("/login", async(req, res)=>{
    const {email, password } = req.body;
    const user = await UserModel.findOne({email})
    const hash = user.password;

    bcrypt.compare(password, hash, function (err , result){
        if(err){
            res.send("Oops! Something went wrong")
           }
        if(result){
            const token = jwt.sign({userId:user._id},process.env.JWT_SECRET)
            res.send({message: "Login Successful", token})
        }else{
            res.send("Invalid Credentials!")
        }
    })
})

module.exports={
    userController
}