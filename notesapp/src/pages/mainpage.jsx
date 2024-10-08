import { createContext, useState } from "react";
import styles from "./styles/mainpage.module.css";
import CreateGroup from "../components/CreateGroupComponent";
import ChatBox from "../components/ChatBoxComponent";
import GroupList from "../components/GroupListComponent";
import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";

export const Context = createContext();

const MainPage = () => {
  const [showAddNotes, setShowAddNotes] = useState(false);
  const [createdNewGroup, setCreatedNewGroup] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const handleClick = () => {
    setShowAddNotes(true);
    setCreatedNewGroup(false);
  };

  const handleOverlayClick = () => {
    setShowAddNotes(false);
  };

  return (
    <Context.Provider
      value={{
        selectedGroup,
        setSelectedGroup,
        selectedColor,
        setSelectedColor,
      }}
    >
      <div className={styles.container}>
        {!selectedGroup && isMobile && (
          <>
            <GroupList
              className={styles.groupList}
              createdNewGroup={createdNewGroup}
            />
            <button className={styles.addNotes} onClick={handleClick}>
              +
            </button>
          </>
        )}
        {!isMobile && (
          <div className={styles.groupList}>
            <GroupList createdNewGroup={createdNewGroup} />
            <button className={styles.addNotes} onClick={handleClick}>
              +
            </button>
          </div>
        )}

        <ChatBox />

        {showAddNotes && (
          <div
            className={styles.overlay}
            onClick={handleOverlayClick}
          >
            <div
              className={styles.addNotesComponent}
              onClick={(e) => e.stopPropagation()} // Stop click propagation
            >
              <CreateGroup
                setShowAddNotes={setShowAddNotes}
                setCreatedNewGroup={setCreatedNewGroup}
              />
            </div>
          </div>
        )}
      </div>
    </Context.Provider>
  );
};

MainPage.propTypes = {
  // No props are expected for this component
};

GroupList.propTypes = {
  createdNewGroup: PropTypes.bool.isRequired,
};

CreateGroup.propTypes = {
  setShowAddNotes: PropTypes.func.isRequired,
  setCreatedNewGroup: PropTypes.func.isRequired,
};

export default MainPage;
