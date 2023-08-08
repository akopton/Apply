export const getFullDateString = (date: Date) => {
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};
