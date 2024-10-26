import PropTypes from "prop-types";
import styles from "./styles/NotesFetchComponent.module.css";
import { Context } from "../pages/mainpage";
import { useContext } from "react";
const NotesFetchComponent = ({
  groupName,
  groupColor,
  shortForm,
}) => {

  const {selectedGroup, setSelectedGroup , setSelectedColor} = useContext(Context);
  
  const handleClick = () => {
    setSelectedGroup(groupName);
    setSelectedColor(groupColor);
  };
  return (
    <button onClick={handleClick} className={selectedGroup === groupName? `${styles.button} ${styles.buttonSelected} `: styles.button}>
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
