import { useState, useEffect } from 'react';

const GroupList = ({createdNewGroup}) => {
  const [groupName, setGroupName] = useState('');
  const [groupColor, setGroupColor] = useState('');



  useEffect(() => {
    if(localStorage.getItem("groupData")){
      const data = JSON.parse(localStorage.getItem("groupData"));
      setGroupName(data.groupName);
      setGroupColor(data.groupColor);
      console.log(data.groupName, data.groupColor); 
      // print to console
    }
  }, [createdNewGroup]);

  return (
    <div>
      GroupList
      {groupName && groupColor && <div>{groupName} : {groupColor}</div>}
    </div>
  )
}

export default GroupList;