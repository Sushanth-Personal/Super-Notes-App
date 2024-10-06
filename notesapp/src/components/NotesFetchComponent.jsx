import PropTypes from "prop-types";
import styles from "./styles/NotesFetchComponent.module.css";

const NotesFetchComponent = ({
  groupName,
  groupColor,
  shortForm,
  setCurrentGroupName,
}) => {
  const handleClick = () => {
    setCurrentGroupName(groupName);
  };
  return (
    <button onClick={handleClick} className={styles.button}>
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
  setCurrentGroupName: PropTypes.func.isRequired,
};

export default NotesFetchComponent;
