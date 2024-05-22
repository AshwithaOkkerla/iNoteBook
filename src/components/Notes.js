import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Noteitem from "./Noteitem";
import noteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
const Notes = (props) => {
  const context = useContext(noteContext);
  let navigate = useNavigate();
  console.log(context);
  const { notes, fetchAllNotes,editNote } = context;
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "default",
  });
  useEffect(() => {
    if(localStorage.getItem('token')){
      console.log(localStorage.getItem('token'))
    fetchAllNotes();
    }
    else{
      navigate("/login");
    }
  }, []);
  const ref = useRef(null);
  const refCloseClick = useRef(null);

  const updateNote = (currnote) => {
    ref.current.click();
    setNote({
      id: currnote._id,
      etitle: currnote.title,
      edescription: currnote.description,
      etag: currnote.tag,
    });
    // props.showAlert("Updated Note Successfully","success")
  };
  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refCloseClick.current.click();
    console.log("updating node", note);
    props.showAlert("Updated Note Successfully","success")
  };

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <AddNote showAlert={props.showAlert}/>
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
                    value={note.etitle}
                    onChange={onchange}
                    minLength={6} required
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
                    minLength={6} required
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
                ref={refCloseClick}
              >
                Close
              </button>
              <button
                disabled={note.etitle.length<6 || note.edescription.length<6}
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=" row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-2 my-2">

        {notes.length===0 &&  "No notes do display"}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>
          );
        })}
      </div>
    </div>
  );
};

export default Notes;
