import axios from "axios";

export const createNotesGroup = async (groupName, groupColor, shortForm) => {
  try {
    console.log(groupName,groupColor,shortForm);
    const response = await axios.post("http://localhost:5000/api/notes", {
      groupName,
      groupColor,
      shortForm,
    });
    console.log("Successfully created a group: ", response.data);
    return response.data; // Return the response data for further use if needed
  } catch (error) {
    console.error("Error creating group: ", error);
    throw error; // Throw the error to be handled by the calling function
  }
};

export const getNotes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/notes");
      console.log("Fetched notes data:", response.data);
      return response.data; // Return the data directly
    } catch (error) {
      console.error("Error getting notes:", error);
      return null; // Handle error by returning null or an empty array
    }
  };
