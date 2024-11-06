import TextInputComponent from "./TextInputComponent";
import styles from "./styles/ChatBoxComponent.module.css";
import NotesWidget from "./NotesWidget";
import { useState, useEffect } from "react";
import { getShortForm } from "./GroupListComponent";
import { useNotesContext } from "../Contexts/NotesContext";
import { useUserContext } from "../Contexts/UserContext";
import { useMediaQuery } from "react-responsive";

const ChatBox = () => {
  const { selectedGroup, setSelectedGroup, selectedColor, notes } =
    useNotesContext();

  const { setIsAuthenticated, setIsLoginMode } = useUserContext();

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [chatBoxVisible, setChatBoxVisible] = useState(false);
  const handleBackButton = () => {
    setSelectedGroup(null);
  };

  const handleSignOut = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setIsLoginMode(true);
    window.location.reload();
  };

  useEffect(() => {
    if (isMobile && !selectedGroup) {
      setChatBoxVisible(false);
    } else if (isMobile && selectedGroup) {
      setChatBoxVisible(true);
    }

    if (!isMobile) {
      setChatBoxVisible(true);
    }
  }, [isMobile, selectedGroup]);

  return (
    <>
      {chatBoxVisible && (
        <div className={styles.container} id="chatbox-container">
          {selectedGroup && !isMobile && (
            <header className="d-flex align-items-center justify-content-between p-3">
              <div
                style={{ backgroundColor: selectedColor }}
                className={`${styles.shortForm} me-2`}
              >
                {getShortForm(selectedGroup)}
              </div>
              <p className="flex-grow-1 m-0">{selectedGroup}</p>
              <button
                className="btn btn-primary me-3"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </header>
          )}

          {selectedGroup && isMobile && (
            <header className = {`d-flex align-items-center justify-content-between p-3`}>
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
              <p className={`flex-grow-1 m-0 ms-3 ${styles.groupName}`}>{selectedGroup}</p>
              <button
                className="btn btn-primary me-3"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </header>
          )}

          {!isMobile && (
            <>
              {!selectedGroup && (
                <div className={styles.mainContainer}>
                  <div className={`d-flex justify-content-end w-100`}>
                    <button
                      className="btn btn-primary me-3 mt-3"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </button>
                  </div>
                  <main>
                    <img src="./Mainpage.png" alt="image" />
                    <h1>Pocket Notes</h1>
                    <p>
                      Send and receive messages without keeping your
                      phone online. Use Pocket Notes on up to 4 linked
                      devices and 1 mobile phone.
                    </p>
                  </main>
                  <footer>
                    <img src="./lock.png" alt="lock" />
                    <p>end-to-end encrypted</p>
                  </footer>
                </div>
              )}
            </>
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
                <TextInputComponent />
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatBox;
