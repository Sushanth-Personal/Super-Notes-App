import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import NotesFetchComponent from "./NotesFetchComponent";
import styles from "./styles/GroupListComponent.module.css";
import { getNotes } from "../api/notesAPI";
import { Context } from "../pages/mainpage";
const GroupList = ({ createdNewGroup }) => {
  const [groups, setGroups] = useState([]);
  const { refreshPage, setRefreshPage } = useContext(Context);

  useEffect(() => {
    const fetchNotes = async () => {
      const notes = await getNotes();
      if (notes) {
        console.log("Fetched Notes:", notes);
        setGroups(notes);
      }
    };
    setRefreshPage(false);
    fetchNotes();
  }, [createdNewGroup, refreshPage]);

  return (
    <div className={styles.container} id="group-list-container">
      <header className={styles.title}>
        <h1 className={styles.heading}>Pocket Notes</h1>
      </header>

      {groups && (
        <div className={styles.notesFetchContainer}>
          {groups.map((group) => (
            <NotesFetchComponent
              key={group._id}
              groupId={group._id}
              groupName={group.groupName}
              groupColor={group.groupColor}
              shortForm={getShortForm(group.groupName)}
            />
          ))}
        </div>
      )}
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
