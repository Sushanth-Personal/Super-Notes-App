import React from 'react'

const NotesFetchComponent = ({groupName, groupColor,shortForm}) => {
  return (
    <div>
        <div>{shortForm}</div>
        <div>{groupName}</div>
        <div>{groupColor}</div>
    </div>
  )
}

export default NotesFetchComponent;