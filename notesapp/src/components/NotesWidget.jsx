import { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./styles/NotesWidget.module.css";
const NotesWidget = ({ note, date, time }) => {
  console.log('NotesWidget');
  useEffect(
    ()=>{
      console.log("NotesWidget")
    },[]
  );
  return (
    
      <article  className = {styles.container}>
        <p>{note}</p>
        <div className = {styles.bottomSection}>
          <p className = {styles.date}>{date}</p> 
         <img className = {styles.ellipse} src="./ellipse.png" alt="" /> 
          <p>{`  ${time}`}</p>
        </div>
      </article>
    
  )
}

NotesWidget.propTypes = {
  note: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default NotesWidget;