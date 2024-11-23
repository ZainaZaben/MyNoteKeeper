import NoteContainer from "../components/NoteContainer/NoteContainer";
import classes from "./Notes.module.css";

export default function NotesPage() {
  return (
    <div className={classes.mainContainer}>
      <NoteContainer />
    </div>
  );
}
