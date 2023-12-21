export function getFormattedDate() {
  const currentDate = new Date();

  // Get date components
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
  const day = currentDate.getDate();

  // Get time components
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  // Format components as a string
  const formattedDateTime = `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  } ${hours}:${minutes}:${seconds}`;

  return formattedDateTime;
}
