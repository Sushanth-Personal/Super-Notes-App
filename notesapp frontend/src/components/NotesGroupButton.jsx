import PropTypes from "prop-types";
import styles from "./styles/NotesGroupButton.module.css";
import { useNotesContext } from "../Contexts/NotesContext";
import { useUserContext } from "../Contexts/UserContext";
import { useEffect, useState } from "react";
import { getNotes, deleteNotes } from "../api/notesAPI";

const NotesGroupButton = ({
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
    setGroupId,
    setGroups
  } = useNotesContext();

  const { userId} = useUserContext();
  const [notesFetch, setNotesFetch] = useState(false);

  /**
   * Handles the click event on the group button.
   * Sets notesFetch to true and set the selected group ID to the one of the button.
   */
  const handleClick = () => {
    setNotesFetch(true);
    setGroupId(groupId);
  };

  useEffect(() => {
    if (notesFetch) {
      const fetchNotes = async () => {
        try {
          const notes = await getNotes(userId, groupId);
          setNotes(notes);
          // setNotes(user.groups[groupId-1].notes);
        } catch (err) {
          console.log(err);
        }
      };
      fetchNotes();
      setSelectedGroup(groupName);
      setSelectedColor(groupColor);
      setNotesFetch(false);
    }
  }, [notesFetch]);

  const handleKeyDown = (event) => {
    if (event.key === "Delete") {
      const deleteTheGroup = async () => {
        try {
          const response = await deleteNotes(groupId);
          if (response.status === 200) {
            setSelectedGroup(null);
            setGroups([]);
          }
        } catch (err) {
          console.log(err);
        }
      };

      deleteTheGroup();
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

NotesGroupButton.propTypes = {
  groupId: PropTypes.number.isRequired,
  groupName: PropTypes.string.isRequired,
  groupColor: PropTypes.string.isRequired,
  shortForm: PropTypes.string.isRequired,
};

export default NotesGroupButton;
