import TextInputComponent from "./TextInputComponent";
import styles from "./styles/ChatBoxComponent.module.css";
import NotesWidget from "./NotesWidget";
import { useEffect, useState } from "react";
const ChatBox = ({ currentGroupName = "test group" }) => {
  const [notes, setNotes] = useState(() => {
    const storedNotes = localStorage.getItem("notes");
    return storedNotes
      ? JSON.parse(storedNotes)
      : [
          {
            id: 1,
            description: "This is a test note",
            date: "2023-08-01",
            time: "10:00 AM",
            groupname: "test group",
          },
        ];
  });

  useEffect(() => {
    console.log(notes);
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const [filteredNotes, setFilteredNotes] = useState([]);
  const [isNoteSubmitted, setIsNoteSubmitted] = useState(false);

  useEffect(() => {
    console.log("im in inside useEffect Chatbox");

    const notes = JSON.parse(localStorage.getItem("notes"));
    console.log("currentNotes: ", notes);

    const notesFiltered = notes.filter((notes) => {
      return notes.groupname === currentGroupName;
    });
    setFilteredNotes(notesFiltered);
    setIsNoteSubmitted(false);
  }, [isNoteSubmitted, currentGroupName]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>Header</div>
      <div className={styles.notesDisplay}>
        {console.log("filteredNotes", filteredNotes)}
        {filteredNotes.map((note) => (
          <div key={note.id}>
            <NotesWidget
              note={note.description}
              date={note.date}
              time={note.time}
            />
          </div>
        ))}
      </div>
      <div className={styles.TextInputComponent}>
        <TextInputComponent
          setNotes={setNotes}
          currentGroupName={currentGroupName}
          setIsNoteSubmitted={setIsNoteSubmitted}
        />
      </div>
    </div>
  );
};

export default ChatBox;
