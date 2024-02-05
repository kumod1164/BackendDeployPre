const mongoose  = require("mongoose")

const userSchema = mongoose.Schema({
    name:String,
    age:Number,
    rank:Number,
    city: String
})

const UserModel = mongoose.model("user", userSchema);


 const connection = mongoose.connect("mongodb+srv://kumodsharma1164:mongodb007@cluster0.i8j9kia.mongodb.net/preTrial")

          //console.log("Connected to mongoDB successfully!");

       
module.exports= {connection, UserModel};
 

