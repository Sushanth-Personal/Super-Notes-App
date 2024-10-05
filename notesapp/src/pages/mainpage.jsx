import { useState } from "react";
import styles from "./styles/mainpage.module.css";
import CreateGroup from "../components/CreateGroupComponent";
import ChatBox from "../components/ChatBoxComponent";
import GroupList from "../components/GroupListComponent";

const MainPage = () => {
  const [showAddNotes, setShowAddNotes] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupColor, setGroupColor] = useState("");
  const [createdNewGroup, setCreatedNewGroup] = useState(false);
  const [currentGroupName, setCurrentGroupName] = useState("");

  const handleClick = () => {
    setShowAddNotes(true);
    setCreatedNewGroup(false);
  };

  const handleOverlayClick = () => {
    setShowAddNotes(false);
  };

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
              setGroupColor={setGroupColor}
              setGroupName={setGroupName}
              setShowAddNotes={setShowAddNotes}
              setCreatedNewGroup={setCreatedNewGroup}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
