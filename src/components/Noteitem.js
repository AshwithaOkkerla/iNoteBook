import React, { useContext } from "react";
import noteContext from "../context/notes/NoteContext";

const Noteitem = (props) => {
  const { note, updateNote } = props;
  const context = useContext(noteContext);
  const { delNote } = context;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i
              className="fa-solid fa-trash mx-3"
              onClick={() => {
                props.showAlert("Deleted Note Successfully","success");
                delNote(note._id);
              }}
            ></i>
            <i
              className="fa-solid fa-pencil mx-3"
              onClick={() => {
                updateNote(note);
              }}
            ></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
