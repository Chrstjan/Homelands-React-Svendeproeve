//Inspireret af https://www.freecodecamp.org/news/how-to-format-a-date-with-javascript-date-formatting-in-js/

export const formatMonth = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("dk-DK", { month: "long", year: "numeric" });
}