const formatDateAndTime = (date = Date.now(), format = "date") => {
  const newDate = new Date(date);
  
  // Format date as "9 Mar 2023"
  const formattedDate = newDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  
  const formattedTime = newDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });

  if (format === "date") return formattedDate;
  if (format === "time") return formattedTime;
};

export default formatDateAndTime;
