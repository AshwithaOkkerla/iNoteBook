import React, { useContext, useState } from "react";
import noteContext from "../context/notes/NoteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  console.log(context);
  const { addNote } = context;

  const [note,setNote] = useState({title:"",description:"",tag:""})
  const handleClick = (e) => {
	e.preventDefault();
		addNote(note.title,note.description,note.tag);
    setNote({title:"",description:"",tag:"default"})
    props.showAlert("Added Note Successfully","success")
  };

  const onchange = (e)=>{
	setNote({...note,[e.target.name]:e.target.value})
  }
  return (
    <div>
      <div className="container my-3">
        <h1>Add a Note</h1>
        <form className="my-3">
          <div className="mb-3 my-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              minLength={6} required
              onChange={onchange}
              value={note.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              minLength={6} required
              onChange={onchange}
              value={note.description}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={onchange}
              value={note.tag}
            />
          </div>
          
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
            disabled={note.title.length<6 || note.description.length<6}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
