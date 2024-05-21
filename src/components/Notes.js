import React, { useContext, useEffect, useRef,useState } from "react";
import Noteitem from "./Noteitem";
import noteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
const Notes = () => {
  const context = useContext(noteContext);
  console.log(context);
  const { notes, fetchAllNotes } = context;
  const [note,setNote] = useState({etitle:"",edescription:"",etag:"default"})
  useEffect(() => {
    fetchAllNotes();
  }, []);
  const ref = useRef(null);

  const updateNote = (currnote) => {
	  ref.current.click();
      setNote({etitle:currnote.title, edescription:currnote.description, etag:currnote.tag})
	};
  const handleClick = (e) => {
	e.preventDefault();
	console.log("updating node",note)	

  };

  const onchange = (e)=>{
	setNote({...note,[e.target.name]:e.target.value})
  }
  return (
    <div>
      <AddNote />
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
        ref={ref}
        style={{ display: "none" }}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3 my-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
					value = {note.etitle}
                    onChange={onchange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
					value={note.edescription}
					
                    onChange={onchange}
                  />
				  
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
					value={note.etag}
                    onChange={onchange}
                  />
                </div>

                
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button onClick={handleClick} type="button" className="btn btn-primary">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </div>
  );
};

export default Notes;
