const express = require("express");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

const router = express.Router();
var fetchUser = require("../middleware/fetchUser");

//Route 1: Get logged User all notes using : GET 'api/notes/fetchAllNotes
router.get("/fetchAllNotes", fetchUser, async (req, res) => {
  //fetchUser middleware gives us user id which is obtained by req.user.id
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occured");
  }
});

//Route 2: Add new notes using : POST '/api/notes/addNote

router.post(
  "/addNote",
  fetchUser,
  [
    body("title", "Pls enter more than 3char").isLength({ min: 3 }),
    body("description", "Pls enter more than 6char").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
      }

      //if no errors found
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured");
    }
  }
);



//Route 3: Update existing Note using: POST "/api/auth/updateNote"
router.post(
	"/updateNote/:id",
	fetchUser,
	
	async (req, res) => {
try{
		const {title,description,tag} = req.body;
		//creat a newNote obj
		const newNote = {};
		if(title){newNote.title=title};
		if(description){newNote.description=description};
		if(tag){newNote.tag=tag};
		console.log(newNote)

		//find the note to be updated
		console.log(req.params.id)
		let note = await Notes.findById(req.params.id)

		if(!note){
			return res.status(404).send("not found")
		}

		if(note.user.toString()!== req.user.id){
			//logged in user is trying to access diff user notes
			return res.status(401).send("Not Allowed")
		}

		note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
		res.json({note});
}catch(error){
	console.error(error.message)
	res.status(500).send("Internal server error")
}

	}
)
module.exports = router;
