export const findObjectValues = (object, value) => {
  value = String(value).toLowerCase();

  return Object.entries(object).some((entry) =>
    String(entry[1]).toLowerCase().includes(value)
  );
};
