const lignesNum = [
  "Ligne 1",
  "Ligne 2",
  "Ligne 3",
  "Ligne 3bis",
  "Ligne 4",
  "Ligne 5",
  "Ligne 6",
  "Ligne 7",
  "Ligne 7bis",
  "Ligne 8",
  "Ligne 9",
  "Ligne 10",
  "Ligne 11",
  "Ligne 12",
  "Ligne 13",
  "Ligne 14",
];

export const linesWithColors = [
  { Ligne: "Ligne 1", color: "#FFBE00" },
  { Ligne: "Ligne 2", color: "#0055C8" },
  { Ligne: "Ligne 3", color: "#6E6E00" },
  { Ligne: "Ligne 3bis", color: "#6EC4E8" },
  { Ligne: "Ligne 4", color: "#A0006E" },
  { Ligne: "Ligne 5", color: "#FF7E2E" },
  { Ligne: "Ligne 6", color: "#6ECA97" },
  { Ligne: "Ligne 7", color: "#FA9ABA" },
  { Ligne: "Ligne 7bis", color: "#6ECA97" },
  { Ligne: "Ligne 8", color: "#D282BE" },
  { Ligne: "Ligne 9", color: "#B6BD00" },
  { Ligne: "Ligne 10", color: "#C9910D" },
  { Ligne: "Ligne 11", color: "#704B1C" },
  { Ligne: "Ligne 12", color: "#06814F" },
  { Ligne: "Ligne 13", color: "#6EC4E8" },
  { Ligne: "Ligne 14", color: "#62259D" },
];
export default function splitDataByLine(data) {
  const lignesObj = {};

  lignesNum.forEach((ligne) => {
    lignesObj[`ligne_${ligne.split(' ')[1]}`] = data.features.filter((item) => item.properties.Ligne === ligne);
  });

  return lignesObj;
}