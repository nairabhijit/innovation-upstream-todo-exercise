export const formatDate = (date: Date, format: string) => {
  const monthShortNames = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = date.getMonth() + 1;
  const monthNameStr = monthShortNames[month];
  const monthStr = month < 10 ? `${0}${month}` : `${month}`;
  const day = date.getDate();
  const dayStr = day < 10 ? `${0}${day}` : `${day}`;
  const year = date.getFullYear();
  const formattedDate = format
    .replace("yyyy", year.toString())
    .replace("mm", monthStr)
    .replace("dd", dayStr)
    .replace("MM", monthNameStr);

  return formattedDate;
};
