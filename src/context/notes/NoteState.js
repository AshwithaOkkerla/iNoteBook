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
      _id: "664c0c3c4028113fa00bbd7a",
      user: "664c0b2a4028113fa00bbd72",
      title: "Chilling ",
      description: "enjoyed summer hldys",
      tag: "vacation",
      date: "2024-05-21T02:51:40.026Z",
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
      _id: "664c0c3c4028113fa00bbd7a",
      user: "664c0b2a4028113fa00bbd72",
      title: "Chilling ",
      description: "enjoyed summer hldys",
      tag: "vacation",
      date: "2024-05-21T02:51:40.026Z",
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
  ];

  	const [notes,setNotes] = useState(notesInitial)
  return (
    <NoteContext.Provider value={{notes,setNotes}}>{props.children}</NoteContext.Provider>
  );
};

export default NoteState;
