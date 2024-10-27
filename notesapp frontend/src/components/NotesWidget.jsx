import { useContext } from "react";
import PropTypes from "prop-types";
import styles from "./styles/NotesWidget.module.css";
import { Context } from "../pages/mainpage";
import { addNotes } from "../api/notesAPI";
const NotesWidget = ({ id, note, date, time }) => {
  const {
    selectedGroup,
    notes,
    setNotes,
    groupId,
  } = useContext(Context);

  const deleteCurrentNote = () => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    addNotes(groupId, updatedNotes);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Delete") {
      deleteCurrentNote();
    }
  };

  return (
    <div>
      {selectedGroup && note && (
        <article
          className={styles.container}
          onKeyDown={handleKeyDown}
          tabIndex="0"
        >
          <p className={styles.descriptionText}>{note}</p>
          <div className={styles.bottomSection}>
            <p className={styles.date}>{date}</p>
            <img
              className={styles.ellipse}
              src="./ellipse.png"
              alt=""
            />
            <p>{`  ${time}`}</p>
          </div>
        </article>
      )}
    </div>
  );
};

NotesWidget.propTypes = {
  id: PropTypes.number.isRequired,
  note: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default NotesWidget;
