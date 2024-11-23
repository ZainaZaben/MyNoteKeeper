import { useState } from "react";
import AddNote from "../AddNote/AddNote";
import NoteList from "../NoteList/NoteList";
import classes from "./NoteContainer.module.css";

export default function NoteContainer() {
  const [showAddForm, setShowAddForm] = useState(false);

  const toggleAddForm = () => setShowAddForm((prev) => !prev);

  return (
    <div className={classes.noteAppContainer}>
      <div className={classes.topSection}>
        {!showAddForm ? (
          <button
            className={classes.takeNoteInput}
            onClick={toggleAddForm}
            aria-label="Take a note"
          >
            Take a note...
          </button>
        ) : (
          <div className={classes.addNoteRow}>
            <AddNote setShowAddForm={setShowAddForm} />
          </div>
        )}
      </div>

      <div className={classes.noteListSection}>
        <NoteList />
      </div>
    </div>
  );
}
