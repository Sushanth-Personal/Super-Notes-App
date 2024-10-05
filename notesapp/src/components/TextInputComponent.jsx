import styles from "./styles/TextInputComponent.module.css";
import formatDateAndTime from "../utils/formatDateAndTime";
import { useState, useEffect } from "react";

const TextInputComponent = ({
  setNotes,
  currentGroupName,
  setSendNotesButtonClicked,
}) => {
  const [date, setDate] = useState([]);
  const [description, setDescription] = useState("");

  const handleClick = () => {
    addCurrentNote();
    setSendNotesButtonClicked(true);
  };

  const addCurrentNote = () => {
    const existingNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setDate(formatDateAndTime(Date.now()));
    const notes = {
      id: existingNotes.length+1,
      date: formatDateAndTime(Date.now(), "date"),
      time: formatDateAndTime(Date.now(), "time"), // assuming you have a time format option
      description: description,
      groupName: currentGroupName, // replace with actual group name
    };
    setNotes([...existingNotes, notes]);
  };

  const handleChange = (e) => {
    setDescription(e.target.value); // update description state on text change
  };

  return (
    <div className={styles.container}>
      <textarea className={styles.textArea} onChange={handleChange} />
      <button
        className={styles.textEnterButton}
        onClick={handleClick}
      >
        <img src="./TextEnterButton.png" />
      </button>
    </div>
  );
};

export default TextInputComponent;
