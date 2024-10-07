import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import NotesFetchComponent from "./NotesFetchComponent";
import styles from "./styles/GroupListComponent.module.css";

const GroupList = ({ createdNewGroup, setCurrentGroupName }) => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("groupData")) {
      const data = JSON.parse(localStorage.getItem("groupData"));
      setGroups(data);
    }
  }, [createdNewGroup]);

  return (
    <div className={styles.container}>
      <h1 className = {styles.heading}>Pocket Notes</h1>
      <div className = {styles.notesFetchContainer}>
        
        {groups &&
          groups.map((group, index) => (
            <div className = {styles.notesFetchComponent} key={index}>
              {/*  */}
              <NotesFetchComponent
                groupName={group.groupName}
                groupColor={group.groupColor}
                shortForm={getShortForm(group.groupName)}
                setCurrentGroupName={setCurrentGroupName}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

function getShortForm(groupName) {
  const words = groupName.split(" ");
  if (words.length === 1) {
    return words[0].charAt(0);
  } else if (words.length === 2) {
    return words[0].charAt(0) + words[1].charAt(0);
  } else {
    return words[0].charAt(0) + words[1].charAt(0);
  }
}

GroupList.propTypes = {
  createdNewGroup: PropTypes.bool.isRequired,
  setCurrentGroupName: PropTypes.func.isRequired,
};

GroupList.defaultProps = {
  createdNewGroup: false,
};

export default GroupList;
