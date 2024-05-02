import { encoded, translations } from "./data.js";

console.log("Let's rock");
console.log(encoded, translations);

function decodeData(data, translations) {
  const uniqueIds = new Set();
  const decodedData = data.map((item) => {
    const decodedItem = {};

    for (const [key, value] of Object.entries(item)) {
      if ((key.endsWith("Id") || key.endsWith("id")) && key !== "groupId") {
        if (value in translations) {
          decodedItem[key] = translations[value];
        } else {
          value !== null ? uniqueIds.add(value) : (decodedItem[key] = value);
        }
      } else {
        decodedItem[key] = value;
      }
    }

    return decodedItem;
  });

  console.log("Уникальные id:", Array.from(uniqueIds));
  return { decodedData };
}

const decoded = decodeData(encoded, translations);

console.log(decoded);
