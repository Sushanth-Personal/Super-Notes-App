import PropTypes from "prop-types";
import styles from "./styles/NotesFetchComponent.module.css";
import { Context } from "../pages/mainpage";
import { useEffect, useContext, useState } from "react";
import { getNotes, deleteNotes } from "../api/notesAPI";

const NotesFetchComponent = ({
  groupId,
  groupName,
  groupColor,
  shortForm,
}) => {
  const {
    selectedGroup,
    setSelectedGroup,
    setSelectedColor,
    setNotes,
    notes,
    setGroupId,
    setRefreshPage,
  } = useContext(Context);

  const [notesFetch, setNotesFetch] = useState(false);

  const handleClick = () => {
    setNotesFetch(true);
  };

  useEffect(() => {
    const getNotesById = async () => {
      const filteredNotes = await getNotes(groupId);
      setNotes(filteredNotes.notes);
    };
    getNotesById();

    if (notesFetch) {
      setSelectedGroup(groupName);
      setSelectedColor(groupColor);
      setGroupId(groupId);
      setNotesFetch(false);
    }
  }, [notesFetch]);

  const handleKeyDown = (event) => {
    if (event.key === "Delete") {
      deleteNotes(groupId);
      setRefreshPage(true);
      setSelectedGroup(null);
    }
  };

  return (
    <button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={
        selectedGroup === groupName
          ? `${styles.button} ${styles.buttonSelected} `
          : styles.button
      }
    >
      <span
        className={styles.shortForm}
        style={{ backgroundColor: groupColor }}
      >
        {shortForm}
      </span>
      <span className={styles.groupName}>{` ${groupName}`} </span>
    </button>
  );
};

NotesFetchComponent.propTypes = {
  groupName: PropTypes.string.isRequired,
  groupColor: PropTypes.string.isRequired,
  shortForm: PropTypes.string.isRequired,
};

export default NotesFetchComponent;
