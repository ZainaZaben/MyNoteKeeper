import PropTypes from "prop-types"; 
import classes from "./NoteItem.module.css";

export default function NoteItem({
  note,
  setDeleteConfirmation,
  setShowUpdateDialog,
  setIdToUpdate,
  color,
}) {
  const date = new Date(note.creationDate);
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  return (
    <div
      key={note._id}
      className={classes.noteItem}
      style={{ backgroundColor: color }}
      onClick={() => {
        setShowUpdateDialog(true);   
        setIdToUpdate(note._id);    
      }}
    >
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p className={classes.noteDate}>{formattedDate}</p>
      <div className={classes.noteFooter}>
        <button
          className={classes.deleteBtn}
          onClick={(e) => {
            e.stopPropagation(); 
            setDeleteConfirmation({ isShow: true, id: note._id });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18"></path>
            <path d="M19 6l1 16H4L5 6h14z"></path>
            <path d="M10 11v6"></path>
            <path d="M14 11v6"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

NoteItem.propTypes = {
  note: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    creationDate: PropTypes.string.isRequired,
  }).isRequired,
  setDeleteConfirmation: PropTypes.func.isRequired,
  setShowUpdateDialog: PropTypes.func.isRequired,
  setIdToUpdate: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired, 
};
