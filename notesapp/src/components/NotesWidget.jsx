import { useEffect } from "react";

const NotesWidget = ({note,date,time}) => {
  console.log('NotesWidget');
  useEffect(
    ()=>{
      console.log("NotesWidget")
      console.log(note,date,time);
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

export default NotesWidget