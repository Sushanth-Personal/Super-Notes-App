import PropTypes from 'prop-types';

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

NotesFetchComponent.propTypes = {
  groupName: PropTypes.string.isRequired,
  groupColor: PropTypes.string.isRequired,
  shortForm: PropTypes.string.isRequired,
  setCurrentGroupName: PropTypes.func.isRequired,
};

export default NotesFetchComponent;