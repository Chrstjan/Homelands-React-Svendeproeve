//Inspireret af https://www.freecodecamp.org/news/how-to-format-number-as-currency-in-javascript-one-line-of-code/

export const formatPrice = (price) => { 
    const dansishPrice = new Intl.NumberFormat('da-DK', { currency: 'DKK' }).format(price);
    return dansishPrice;
 }