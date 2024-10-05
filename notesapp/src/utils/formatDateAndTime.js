const formatDateAndTime = (date = Date.now(), format = "date") => {
  const newDate = new Date(date);
  const formattedDate = newDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
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
