import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //fetch all notes
  const fetchAllNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY0YzBiMmE0MDI4MTEzZmEwMGJiZDcyIn0sImlhdCI6MTcxNjI1OTYyNn0.lD_y7eKUu_1xI-8mYMK88blbSyYUOHjdoxa86o0oIPE",
      },
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)
  };
  //ADd a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY0YzBiMmE0MDI4MTEzZmEwMGJiZDcyIn0sImlhdCI6MTcxNjI1OTYyNn0.lD_y7eKUu_1xI-8mYMK88blbSyYUOHjdoxa86o0oIPE",
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    console.log(json)

    console.log("Adding a new note");
    const note = {
      _id: "664c0c3c4028113fa00bbd7abcde",
      user: "664c0b2a4028113fa00bbd72",
      title: title,
      description: description,
      tag: tag,
      date: "2024-05-21T02:51:40.026Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  //Delete a note
  const delNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY0YzBiMmE0MDI4MTEzZmEwMGJiZDcyIn0sImlhdCI6MTcxNjI1OTYyNn0.lD_y7eKUu_1xI-8mYMK88blbSyYUOHjdoxa86o0oIPE",
      },
    });
    const json = response.json();
    console.log(json)

    console.log("delete note with id: ", id);
    const newnotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newnotes);
  };

  //edit a note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY0YzBiMmE0MDI4MTEzZmEwMGJiZDcyIn0sImlhdCI6MTcxNjI1OTYyNn0.lD_y7eKUu_1xI-8mYMK88blbSyYUOHjdoxa86o0oIPE",
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    for (let i = 0; i < notes.length; i++) {
      const ele = notes[i];
      if (ele._id === id) {
        ele.title = title;
        ele.description = description;
        ele.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, delNote, editNote,fetchAllNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
