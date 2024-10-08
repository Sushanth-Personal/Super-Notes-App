import { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import styles from "./styles/NotesWidget.module.css";
import { Context } from "../pages/mainpage";

const NotesWidget = ({ note, date, time }) => {
  
  const {selectedGroup} = useContext(Context);
  useEffect(
    ()=>{
      console.log("NotesWidget")
    },[]
  );
  return (
    <div>
      { selectedGroup &&
        <article  className = {styles.container}>
          <p className = {styles.descriptionText}>{note}</p>
          <div className = {styles.bottomSection}>
            <p className = {styles.date}>{date}</p>
           <img className = {styles.ellipse} src="./ellipse.png" alt="" />
            <p>{`  ${time}`}</p>
          </div>
        </article>
      }
    </div>
  )
}

NotesWidget.propTypes = {
  note: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default NotesWidget;