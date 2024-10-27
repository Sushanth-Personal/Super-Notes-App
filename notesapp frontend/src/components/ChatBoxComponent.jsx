import TextInputComponent from "./TextInputComponent";
import styles from "./styles/ChatBoxComponent.module.css";
import NotesWidget from "./NotesWidget";
import { useState, useContext,useEffect } from "react";
import { getShortForm } from "./GroupListComponent";
import { Context } from "../pages/mainpage";
import { useMediaQuery } from "react-responsive";
import { getNotes } from "../api/notesAPI";

const ChatBox = () => {
  const { selectedGroup, setSelectedGroup, selectedColor, notes } =
    useContext(Context);

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [isNoteSubmitted, setIsNoteSubmitted] = useState(false);
  const [chatBoxVisible,setChatBoxVisible] = useState(false);
  const handleBackButton = () => {
    setSelectedGroup(null);
  };

  useEffect(()=>{
    if(isMobile && !selectedGroup){
      setChatBoxVisible(false);
    }else if(isMobile && selectedGroup){
      setChatBoxVisible(true);
    }

    if(!isMobile){
      setChatBoxVisible(true);
    }
 console.log("chatBox",chatBoxVisible);
  },[isMobile,selectedGroup]);

  return (
    <>
    {chatBoxVisible&&
    <div className={styles.container} id="chatbox-container">
      {selectedGroup && !isMobile && (
        <header>
          <div
            style={{ backgroundColor: selectedColor }}
            className={styles.shortForm}
          >
            {getShortForm(selectedGroup)}
          </div>
          <p className={styles.groupName}>{selectedGroup}</p>
        </header>
      )}

      {selectedGroup && isMobile && (
        <header>
          <div
            className={styles.backButtonContainer}
            tabIndex="0"
            onClick={handleBackButton}
          >
            <img
              className={styles.backButton}
              src="./backButton.png"
              alt="back"
            />
          </div>
          <div
            style={{ backgroundColor: selectedColor }}
            className={styles.shortForm}
          >
            {getShortForm(selectedGroup)}
          </div>
          <p className={styles.groupName}>{selectedGroup}</p>
        </header>
      )}

      {!isMobile && (
        <>
          {!selectedGroup && (
            <div className={styles.mainContainer}>
              <main>
                <img src="./Mainpage.png" alt="image" />
                <h1>Pocket Notes</h1>
                <p>
                  Send and receive messages without keeping your phone
                  online. Use Pocket Notes on up to 4 linked devices
                  and 1 mobile phone.
                </p>
              </main>
              <footer>
                <img src="./lock.png" alt="lock" />
                <p>end-to-end encrypted</p>
              </footer>
            </div>
          )}

          {selectedGroup && (
            <>
              <div className={styles.notesDisplay}>
                {notes.map((note) => (
                  <div key={note.id}>
                    <NotesWidget
                      id={note.id}
                      note={note.text}
                      date={note.date}
                      time={note.time}
                    />
                  </div>
                ))}
              </div>
              <div className={styles.TextInputComponent}>
                <TextInputComponent
                  setIsNoteSubmitted={setIsNoteSubmitted}
                />
              </div>
            </>
          )}

        </>
      )}

      {isMobile && selectedGroup && (
        <>
          <div className={styles.notesDisplay}>
            {notes.map((note) => (
              <div key={note.id}>
                <NotesWidget
                  id={note.id}
                  note={note.text}
                  date={note.date}
                  time={note.time}
                />
              </div>
            ))}
          </div>

          <div className={styles.TextInputComponent}>
            <TextInputComponent
              setIsNoteSubmitted={setIsNoteSubmitted}
            />
          </div>
        </>
      )}
    </div>
    }
   </>
  );
};

export default ChatBox;
