export function formatDay(timestamp) {
  const date = new Date(timestamp);
  const options = { day: "numeric", year: "numeric", month: "long" };

  const formattedDate = new Intl.DateTimeFormat("da-DK", options).format(date);

  return formattedDate;
}
