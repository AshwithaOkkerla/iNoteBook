import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "664c0bce4028113fa00bbd76",
      user: "664c0b2a4028113fa00bbd72",
      title: "WebDev-update",
      description: "doing react and backend projects-update",
      tag: "personal",
      date: "2024-05-21T02:49:50.553Z",
      __v: 0,
    },
    {
      _id: "664c0c3c4028113fa00bbd7a",
      user: "664c0b2a4028113fa00bbd72",
      title: "Chilling ",
      description: "enjoyed summer hldys",
      tag: "vacation",
      date: "2024-05-21T02:51:40.026Z",
      __v: 0,
    },
    {
      _id: "664c0c3c4028113fa00bbd7ae",
      user: "664c0b2a4028113fa00bbd72",
      title: "Chilling ",
      description: "enjoyed summer hldys",
      tag: "vacation",
      date: "2024-05-21T02:51:40.026Z",
      __v: 0,
    },
    {
      _id: "664c0c3c4028113fa00bbd7ad",
      user: "664c0b2a4028113fa00bbd72",
      title: "Chilling ",
      description: "enjoyed summer hldys",
      tag: "vacation",
      date: "2024-05-21T02:51:40.026Z",
      __v: 0,
    },
    {
      _id: "664c0c3c4028113fa00bbd7ac",
      user: "664c0b2a4028113fa00bbd72",
      title: "Chilling ",
      description: "enjoyed summer hldys",
      tag: "vacation",
      date: "2024-05-21T02:51:40.026Z",
      __v: 0,
    },
    {
      _id: "664c0c3c4028113fa00bbd7ab",
      user: "664c0b2a4028113fa00bbd72",
      title: "Chilling ",
      description: "enjoyed summer hldys",
      tag: "vacation",
      date: "2024-05-21T02:51:40.026Z",
      __v: 0,
    },
  ];

  	const [notes,setNotes] = useState(notesInitial)
    //ADd a note
    const addNote = (title,description,tag) =>{
      console.log("Adding a new note")
      const note =  {
        _id: "664c0c3c4028113fa00bbd7abcde",
        user: "664c0b2a4028113fa00bbd72",
        title: title,
        description: description,
        tag: tag,
        date: "2024-05-21T02:51:40.026Z",
        __v: 0,
      };
      setNotes(notes.concat(note))
    }

    //Delete a note
    const delNote = (id)=>{
        console.log("delete note with id: ",id)
        const newnotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newnotes)
    } 


    //edit a note
    const editNote = (id,title,description,tag)=>{
      for(let i=0;i<notes.length;i++){
        const ele = notes[i];
        if(ele._id===id){
          ele.title = title; ele.description = description;
          ele.tag = tag;
        }
      }
    }


  return (
    <NoteContext.Provider value={{notes,addNote,delNote,editNote}}>{props.children}</NoteContext.Provider>
  );
};

export default NoteState;
