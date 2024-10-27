import axios from "axios";

export const createNotesGroup = async (
  groupName,
  groupColor,
  shortForm
) => {
  try {
    console.log(groupName, groupColor, shortForm);
    let notes = [];
    const response = await axios.post(
      "http://localhost:5000/api/notes",
      {
        groupName,
        groupColor,
        shortForm,
        notes,
      }
    );
    console.log("Successfully created a group: ", response.data);
    return response.data; // Return the response data for further use if needed
  } catch (error) {
    console.error("Error creating group: ", error);
    throw error; // Throw the error to be handled by the calling function
  }
};

export const getNotes = async (id) => {
  try {
    let response;

    if (!id) {
      response = await axios.get(`http://localhost:5000/api/notes`);
    } else {
      response = await axios.get(
        `http://localhost:5000/api/notes/${id}`
      );
    }
    return response.data; // Return the data directly
  } catch (error) {
    console.error("Error getting notes:", error);
    return null; // Handle error by returning null or an empty array
  }
};

  export const addNotes = async(id,notes)=>{
    try{
        await axios.put(`http://localhost:5000/api/notes/${id}`,{notes});
    }
    catch(error){
        console.error("Error adding notes: ",error);
    }
  }

  export const deleteNotes=async(groupId)=>{
   try{
    if(groupId){
      await axios.delete(`http://localhost:5000/api/notes/${groupId}`);
      console.log("Successfully deleted");
    }else{
      console.log("Group doesnt exist");
    }
   }catch(error){
    console.error("error deleting notes: ", error);
   }
  }