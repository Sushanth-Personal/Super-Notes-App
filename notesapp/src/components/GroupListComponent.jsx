import { useState, useEffect } from "react";

const GroupList = ({ createdNewGroup }) => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("groupData")) {
      const data = JSON.parse(localStorage.getItem("groupData"));
      setGroups(data);
      console.log(data);
      // print to console
    }
  }, [createdNewGroup]);

  return (
    <>
      <div>GroupList</div>
      {groups &&
        groups.map((group, index) => (
          <div key={index}>
            <div >{group.groupName}</div>
            <div >{getShortForm(group.groupName)}</div>
          </div>
        ))}
    </>
  );
};

function getShortForm(groupName) {
  const words = groupName.split(' ');
  if (words.length === 1) {
    return words[0].charAt(0);
  } else if (words.length === 2) {
    return words[0].charAt(0) + words[1].charAt(0);
  } else {
    return words[0].charAt(0) + words[1].charAt(0);
  }
}

export default GroupList;
