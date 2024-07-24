const formatPrice = (price: any, sale: any) => {
  return (Number(price) - (Number(price) * Number(sale)) / 100).toLocaleString(
    "de-DE"
  );
};

const convertPrice = (price: any) => {
  return Number(price).toLocaleString("de-DE");
};

export { formatPrice, convertPrice };
