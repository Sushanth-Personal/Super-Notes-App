import { useState } from "react";
import styles from "./styles/mainpage.module.css";
import AddNotes from "../components/AddNotesComponent";
import ChatBox from "../components/ChatBoxComponent";
import GroupList from "../components/GroupListComponent";

const MainPage = () => {
  const [showAddNotes, setShowAddNotes] = useState(false);

  const handleClick = () => {
    setShowAddNotes(true);
  };

  const handleOverlayClick = () => {
    setShowAddNotes(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.groupList}>
        <GroupList />
        <button className={styles.addNotes} onClick={handleClick}>
          +
        </button>
      </div>
      <div className={styles.chatBox}>
        <ChatBox />
      </div>
      {showAddNotes && (
        <div className={styles.overlay} onClick={handleOverlayClick}>
          <div
            className={styles.addNotesComponent}
            onClick={(e) => e.stopPropagation()}
          >
            <AddNotes />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
