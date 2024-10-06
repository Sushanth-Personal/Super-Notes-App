import { useEffect } from "react";
import PropTypes from "prop-types";

const NotesWidget = ({ note, date, time }) => {
  console.log('NotesWidget');
  useEffect(
    ()=>{
      console.log("NotesWidget")
    },[]
  );
  return (
    <>
      <p>{note}</p>
      <p>{date}</p>
      <p>{time}</p>
    </>
  )
}

NotesWidget.propTypes = {
  note: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default NotesWidget;