const express = require("express")
const {userController} = require("./routes/user.routes")
const {notesController} = require("./routes/notes.routes")
const {connection} = require("./configs/db");
const { auth } = require("./middlewares/auth");

const app = express();


const PORT = 8080;
app.use(express.json());

app.get("/", (req,res)=>{
    res. send("Server is Running fine")
})

app.use("/user", userController);
app.use(auth)

app.use("/notes", notesController)

app.listen(PORT,async()=>{
    try {
        await connection;
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
    }
    console.log(`Listening on PORT ${PORT}`)
})