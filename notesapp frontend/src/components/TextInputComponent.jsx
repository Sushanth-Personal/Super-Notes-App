import styles from "./styles/TextInputComponent.module.css";
import formatDateAndTime from "../utils/formatDateAndTime";
import { useState } from "react";
import GreyButton from "../assets/GreyButton.png";
import BlueButton from "../assets/BlueButton.png";
import {useUserContext} from "../Contexts/UserContext";
import {useNotesContext} from "../Contexts/NotesContext";
import { addNotes } from "../api/notesAPI";
const TextInputComponent = () => {
  const [description, setDescription] = useState("");
  const { groupId, notes, setNotes } = useNotesContext();
  const {userId} = useUserContext();

  const handleClick = () => {
    if (description.trim() !== "") {
      addCurrentNote();
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

    const updatingNotes = async () => {
      try {
        await addNotes(userId, groupId, updatedNotes);
      } catch (error) {
        console.error("Error adding notes:", error);
      }
    };
    updatingNotes();
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

export default TextInputComponent;
