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
          <div key={index}>{group.groupName}</div>
        ))}
    </>
  );
};

export default GroupList;
