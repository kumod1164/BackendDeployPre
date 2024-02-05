const {Router} = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv').config();

const {noteModel, NoteModel} = require("../models/note.model")

const notesController = Router();

notesController.get("/", async(req, res)=>{
    const notes = await NoteModel.find({_id:req.body.userId})
        res.send("notes")
})

notesController.post("/create", async(req, res)=>{
   const {Heading, Note, Tag} = req.body;
    const note = new NoteModel({
        Heading,
        Note,
        Tag
    })
    try {
        await note.save();
        res.send("Note Created")
        
    } catch (error) {
        console.log(error)
    }
})


module.exports={
    notesController
}