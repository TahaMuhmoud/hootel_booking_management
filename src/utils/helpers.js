export function getTotalPrice(price, discount) {
  if (!discount) discount = 0;
  price = Number(price);
  discount = Number(discount);
  return price - (price * discount) / 100;
}

export function firstLitterToUpper(text) {
  return text[0].toUpperCase() + text.split("").slice(1).join("");
}

export function getToDay({ end }) {
  let today = new Date();
  if (end) today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
}

export function randomColor(start = "", opacity = "") {
  return `#${start + Array.from({ length: start ? 4 : 6 }, () => Math.ceil(Math.random() * 10 - 1)).join("") + opacity}`;
}
