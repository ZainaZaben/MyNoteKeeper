import { useState, useContext, useEffect } from "react";
import { updateNote } from "../../api";
import { NoteAppContext } from "../../context/NoteAppContext";
import classes from "./UpdateNote.module.css";
import PropTypes from "prop-types";

export default function UpdateNote({ idToUpdate: id, setShowUpdateDialog }) {
  const { notes, setNotes } = useContext(NoteAppContext); 
  const initialInputsValue = { title: "", content: "" };
  const [inputs, setInputs] = useState(initialInputsValue);

  useEffect(() => {
    const noteToEdit = notes.find((note) => note._id === id);
    if (noteToEdit) {
      setInputs({ title: noteToEdit.title, content: noteToEdit.content });
    }
  }, [id, notes]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = { ...inputs };
    if (values["title"] === "") delete values.title;
    if (values["content"] === "") delete values.content;
    const newData = await updateNote(id, values);
    setNotes(newData); 
    setShowUpdateDialog(false);
  };

  return (
    <div className={classes.overlay} onClick={() => setShowUpdateDialog(false)}>
      <div
        className={`${classes.confirmationDialog} ${classes.editDialog}`}
        onClick={(e) => e.stopPropagation()}
      >
        <form className={classes.editForm} onSubmit={handleSubmit}>
          <h2>Edit Note</h2>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={inputs.title}
            onChange={handleChange}
          />
          <label>Content:</label>
          <textarea
            name="content"
            value={inputs.content}
            onChange={handleChange}
          />
          <div className={classes.editFormButtons}>
            <button className={classes.updateNoteBtn} type="submit">
              Update Note
            </button>
            <button
              className={classes.cancel}
              type="button"
              onClick={() => setShowUpdateDialog(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

UpdateNote.propTypes = {
  idToUpdate: PropTypes.string.isRequired,
  setShowUpdateDialog: PropTypes.func.isRequired,
};
