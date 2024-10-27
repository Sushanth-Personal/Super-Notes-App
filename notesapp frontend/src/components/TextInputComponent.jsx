import styles from "./styles/TextInputComponent.module.css";
import formatDateAndTime from "../utils/formatDateAndTime";
import { useState, useContext } from "react";
import PropTypes from "prop-types";
import GreyButton from "../assets/GreyButton.png";
import BlueButton from "../assets/BlueButton.png";
import { Context } from "../pages/mainpage";
import { addNotes } from "../api/notesAPI";
const TextInputComponent = ({ setIsNoteSubmitted }) => {
  const [description, setDescription] = useState("");
  const { groupId, notes, setNotes } = useContext(Context);

  const handleClick = () => {
    if (description.trim() !== "") {
      addCurrentNote();
      setIsNoteSubmitted(true);
      setDescription(""); // Clear the input field after adding the note
    }
  };

  const addCurrentNote = () => {
    console.log(notes.length);
    const existingNotes = notes;
    const newNote = {
      id: existingNotes.length + 1,
      date: formatDateAndTime(Date.now(), "date"),
      time: formatDateAndTime(Date.now(), "time"),
      text: description,
    };

    const updatedNotes = [...existingNotes, newNote];
    setNotes(updatedNotes);
    addNotes(groupId, updatedNotes);
  };

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <div className={styles.container}>
      <textarea
        className={styles.textArea}
        onChange={handleChange}
        value={description}
        placeholder="Enter your text here........."
      />
      <button
        className={styles.textEnterButton}
        onClick={handleClick}
        aria-label="Submit Note"
      >
        <img
          className={styles.textEnterButton}
          src={description.trim() === "" ? GreyButton : BlueButton}
          alt="Submit"
        />
      </button>
    </div>
  );
};

TextInputComponent.propTypes = {
  setNotes: PropTypes.func.isRequired,
  setIsNoteSubmitted: PropTypes.func.isRequired,
};

export default TextInputComponent;
