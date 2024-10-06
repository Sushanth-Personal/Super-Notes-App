import {  useState } from "react";
import styles from "./styles/mainpage.module.css";
import CreateGroup from "../components/CreateGroupComponent";
import ChatBox from "../components/ChatBoxComponent";
import GroupList from "../components/GroupListComponent";
import PropTypes from "prop-types";

const MainPage = () => {
  const [showAddNotes, setShowAddNotes] = useState(false);
  // const [groupName, setGroupName] = useState("");
  // const [groupColor, setGroupColor] = useState("");
  const [createdNewGroup, setCreatedNewGroup] = useState(false);
  const [currentGroupName, setCurrentGroupName] = useState("");

  const handleClick = () => {
    setShowAddNotes(true);
    setCreatedNewGroup(false);
  };

  const handleOverlayClick = () => {
    setShowAddNotes(false);
  }


  return (
    <div className={styles.container}>
      <div className={styles.groupList}>
        <GroupList
          createdNewGroup={createdNewGroup}
          setCurrentGroupName={setCurrentGroupName}
        />
        <button className={styles.addNotes} onClick={handleClick}>
          +
        </button>
      </div>
      <div className={styles.chatBox}>
        <ChatBox currentGroupName={currentGroupName} />
      </div>
      {showAddNotes && (
        <div className={styles.overlay} onClick={handleOverlayClick}>
          <div
            className={styles.addNotesComponent}
            onClick={(e) => e.stopPropagation()} // Stop click propagation
          >
            <CreateGroup

              setShowAddNotes={setShowAddNotes}
              setCreatedNewGroup={setCreatedNewGroup}
              setCurrentGroupName={setCurrentGroupName}
            />
          </div>
        </div>
      )}
    </div>
  );
};

MainPage.propTypes = {
  // No props are expected for this component
};

GroupList.propTypes = {
  createdNewGroup: PropTypes.bool.isRequired,
  setCurrentGroupName: PropTypes.func.isRequired,
};

ChatBox.propTypes = {
  currentGroupName: PropTypes.string.isRequired,
};

CreateGroup.propTypes = {
  setShowAddNotes: PropTypes.func.isRequired,
  setCreatedNewGroup: PropTypes.func.isRequired,
};

export default MainPage;