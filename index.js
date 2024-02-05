const express = require("express")
const {connection, UserModel} = require("./db")

const app = express();
app.use(express.json())

app.get("/", (req,res)=>{
    res.send("API working!")

})

app.get("/users", async(req,res)=>{
    const users = await UserModel.find()
    res.send({users})

})

app.post("/users/add", async(req,res)=>{
    await UserModel.create(req.body);
    res.send({"message" : "User added!"})
})

app.put("/users/edit/:id", async(req,res)=>{
    const userId = req.params.id;
    const payload = req.body;
    await UserModel.findOneAndUpdate({_id:userId}, payload)

    res.send({"message" : "User Updated"})
})

app.delete("/users/delete/:id", async(req,res)=>{
    const userId = req.params.id;
    await UserModel.deleteOne({_id:userId})
    res.send({"message" : "User deleted"})
})

app.listen(8000, async()=>{
    try {
        await connection
        console.log("Connected to mongoDB")
        
    } catch (error) {
        console.log("Error while Connecting")
        console.log(error)
    }
    console.log("Listening to port 8000");
})