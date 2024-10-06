import styles from "./styles/TextInputComponent.module.css";
import formatDateAndTime from "../utils/formatDateAndTime";
import { useState } from "react";
import PropTypes from "prop-types";

const TextInputComponent = ({
  setNotes,
  currentGroupName,
  setIsNoteSubmitted,
}) => {
  const [description, setDescription] = useState("");

  const handleClick = () => {
    addCurrentNote();
    setIsNoteSubmitted(true);
    setDescription(""); // Clear the input field after adding the note
  };

  const addCurrentNote = () => {
    const existingNotes =
      JSON.parse(localStorage.getItem("notes")) || [];

    const newNote = {
      id: existingNotes.length + 1,
      date: formatDateAndTime(Date.now(), "date"),
      time: formatDateAndTime(Date.now(), "time"),
      description: description.trim(),
      groupname: currentGroupName,
    };

    const updatedNotes = [...existingNotes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div className={styles.container}>
      <textarea
        className={styles.textArea}
        onChange={handleChange}
        value={description}
        onKeyDown={handleKeyDown}
        placeholder="Write your note..."
      />
      <button
        className={styles.textEnterButton}
        onClick={handleClick}
        aria-label="Submit Note"
      >
        <img src="./TextEnterButton.png" alt="Submit" />
      </button>
    </div>
  );
};

TextInputComponent.propTypes = {
  setNotes: PropTypes.func.isRequired,
  currentGroupName: PropTypes.string.isRequired,
  setIsNoteSubmitted: PropTypes.func.isRequired,
};

export default TextInputComponent;