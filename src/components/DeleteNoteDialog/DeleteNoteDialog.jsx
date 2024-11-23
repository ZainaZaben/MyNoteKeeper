import classes from "./DeleteNoteDialog.module.css";
import PropTypes from 'prop-types'; 

export default function DeleteNoteDialog({
  setDeleteConfirmation,
  handleDeleteNote,
}) {
  return (
    <div className={classes.confirmationOverlay}>
      <div className={classes.confirmationDialog}>
        <h2>Delete Note</h2>
        <p>Are you sure you want to delete this note?</p>
        <button onClick={handleDeleteNote}>Yes, Delete</button>
        <button
          onClick={() =>
            setDeleteConfirmation((prev) => ({ ...prev, isShow: false }))
          }
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

DeleteNoteDialog.propTypes = {
  setDeleteConfirmation: PropTypes.func.isRequired, 
  handleDeleteNote: PropTypes.func.isRequired,   
}   
