// Split the string into an array using a comma and trim spaces around each element

export default function splitComa(array) {
  return array.split(",").map((item) => item.trim());
}
