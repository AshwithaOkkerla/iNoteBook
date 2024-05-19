const express = require('express')
const Notes = require("../models/Notes");

const router = express.Router()
var fetchUser = require('../middleware/fetchUser')

//Route 1: Get logged User all notes using : GET 'api/notes/fetchAllNotes
router.get('/fetchAllNotes',fetchUser,async (req,res)=>{
	//fetchUser middleware gives us user id which is obtained by req.user.id
	const notes = await Notes.find({user:req.user.id});
	res.json(notes);
})

module.exports = router