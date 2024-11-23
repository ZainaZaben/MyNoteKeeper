import { useContext, useState, useEffect, useMemo } from "react";
import { NoteAppContext } from "../../context/NoteAppContext";
import NoteItem from "../NoteItem/NoteItem";
import DeleteNoteDialog from "../DeleteNoteDialog/DeleteNoteDialog";
import UpdateNote from "../UpdateNote/UpdateNote";
import { getData, deleteNote } from "../../api";
import classes from "./NoteList.module.css";

export default function NoteList() {
  const { setNotes, notes, searchTerm } = useContext(NoteAppContext);
  const [loading, setLoading] = useState(true);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [idToUpdate, setIdToUpdate] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    id: null,
    isShow: false,
  });

  const colors = ["#ffffff", "#f09a73", "#f9f7bd", "#d4f7a7", "#c2e6f2", "#f2b0a1"];

  const fetchData = async () => {
    setLoading(true);
    try {
      await getData().then((response) => {
        setNotes(response.data);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  },[]);

  const filteredNotes = useMemo(() => {
    return notes?.filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [notes, searchTerm]);

  const handleDeleteNote = async () => {
    try {
      await deleteNote(deleteConfirmation.id);
      setDeleteConfirmation({ id: null, isShow: false });
      setNotes((prevNotes) =>
        prevNotes.filter((note) => note._id !== deleteConfirmation.id)
      );
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <>
      {loading ? (
        <div className={classes.spinner}>
          <div className={classes.loadingSpinner}></div>
        </div>
      ) : (
        <div className={classes.notesGrid}>
          {filteredNotes?.map((note, index) => (
            <NoteItem
              setDeleteConfirmation={setDeleteConfirmation}
              key={note._id}
              note={note}
              setShowUpdateDialog={setShowUpdateDialog}
              setIdToUpdate={setIdToUpdate}
              color={colors[index % colors.length]} 
            />
          ))}
        </div>
      )}
      {deleteConfirmation.isShow && (
        <DeleteNoteDialog
          handleDeleteNote={handleDeleteNote}
          setDeleteConfirmation={setDeleteConfirmation}
        />
      )}
      {showUpdateDialog && (
        <UpdateNote
          setShowUpdateDialog={setShowUpdateDialog}
          idToUpdate={idToUpdate}
        />
      )}
    </>
  );
}
