const NotesFetchComponent = ({
  groupName,
  groupColor,
  shortForm,
  setCurrentGroupName,
}) => {
  const handleClick = () => {
    setCurrentGroupName(groupName);
  };
  return (
    <div>
      <button onClick={handleClick}>
        <span>{shortForm}</span>
        <span>{` ${groupName}`} </span>
        <span>{groupColor}</span>
      </button>
    </div>
  );
};

export default NotesFetchComponent;
