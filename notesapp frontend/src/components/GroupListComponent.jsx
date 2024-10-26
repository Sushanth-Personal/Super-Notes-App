import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import NotesFetchComponent from "./NotesFetchComponent";
import styles from "./styles/GroupListComponent.module.css";
import { getNotes } from "../api/notesAPI";

const GroupList = ({ createdNewGroup }) => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const notes = await getNotes();
      if (notes) {
        console.log("Fetched Notes:", notes);
        // If you have a state to store notes, set it here
        setGroups(notes); // Assuming `setGroups` is the function to update the notes state
      }
    };
    
    fetchNotes();
  }, [createdNewGroup]);

  return (
    <div className={styles.container}>
      <header className={styles.title}>
        <h1 className={styles.heading}>Pocket Notes</h1>
      </header>
      <div className={styles.notesFetchContainer}>
        {groups &&
          groups.map((group, index) => (
            <div className={styles.notesFetchComponent} key={index}>
              <NotesFetchComponent
                groupName={group.groupName}
                groupColor={group.groupColor}
                shortForm={getShortForm(group.groupName)}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

function getShortForm(groupName) {
  if (groupName) {
    const capitalizedName = groupName.toUpperCase();
    const words = capitalizedName.split(" ");
    if (words.length === 1) {
      return words[0].charAt(0);
    } else if (words.length === 2) {
      return words[0].charAt(0) + words[1].charAt(0);
    } else {
      return words[0].charAt(0) + words[1].charAt(0);
    }
  }
}

GroupList.propTypes = {
  createdNewGroup: PropTypes.bool.isRequired,
};

GroupList.defaultProps = {
  createdNewGroup: false,
};

export default GroupList;
export { getShortForm };
