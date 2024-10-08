import styles from "./styles/TextInputComponent.module.css";
import formatDateAndTime from "../utils/formatDateAndTime";
import { useState, useContext } from "react";
import PropTypes from "prop-types";
import GreyButton from "../assets/GreyButton.png";
import BlueButton from "../assets/BlueButton.png";
import { Context } from "../pages/mainpage";

const TextInputComponent = ({ setNotes, setIsNoteSubmitted }) => {
  const [description, setDescription] = useState("");
  const { selectedGroup } = useContext(Context);
  const handleClick = () => {
    if (description.trim() !== "") {
      addCurrentNote();
      setIsNoteSubmitted(true);
      setDescription(""); // Clear the input field after adding the note
    }
  };

  const addCurrentNote = () => {
    const existingNotes =
      JSON.parse(localStorage.getItem("notes")) || [];

    const newNote = {
      id: existingNotes.length + 1,
      date: formatDateAndTime(Date.now(), "date"),
      time: formatDateAndTime(Date.now(), "time"),
      description: description,
      groupname: selectedGroup,
    };

    const updatedNotes = [...existingNotes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
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
