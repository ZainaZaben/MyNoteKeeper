import PropTypes from "prop-types";
import { useState, useContext } from "react";
import { NoteAppContext } from "../../context/NoteAppContext";
import { addNote, getData, } from "../../api";
import classes from "./AddNote.module.css";

export default function AddNote({ setShowAddForm }) {
  const initialNoteInputValues = { title: "", content: "" };
  const [noteInputs, setNoteInputs] = useState(initialNoteInputValues);
  const { setNotes } = useContext(NoteAppContext);

  const handleChange = (e) => {
    setNoteInputs({ ...noteInputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addNote(noteInputs);
      getData().then((response) => {
        console.log(",,,,,,",response);

        setNotes(response);
        setNoteInputs(initialNoteInputValues);
        setShowAddForm(false);
      });
     } 
    catch (error) {
      console.error("Error adding the note:", error);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setNoteInputs(initialNoteInputValues);
    setShowAddForm(false);
  };

  return (
    <form className={classes.noteForm} onSubmit={handleSubmit}>
      <input
        className={classes.titleInput}
        placeholder="Title"
        name="title"
        required
        value={noteInputs.title}
        onChange={handleChange}
      />
      <textarea
        className={classes.contentTextarea}
        value={noteInputs.content}
        onChange={handleChange}
        placeholder="Content"
        name="content"
        rows={10}
        required
      />
      <div className={classes.buttonRow}>
        <button type="submit">Add Note</button>
        <button type="button" onClick={handleCancel} className={classes.cancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

AddNote.propTypes = {
  setShowAddForm: PropTypes.func.isRequired,
};
