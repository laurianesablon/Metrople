export const lignesWithColors = [
  { Ligne: "Ligne 1", color: "#FDCE02" },
  { Ligne: "Ligne 2", color: "#1763B0" },
  { Ligne: "Ligne 3", color: "#9F9824" },
  { Ligne: "Ligne 3bis", color: "#C14191" },
  { Ligne: "Ligne 4", color: "#F28E42" },
  { Ligne: "Ligne 5", color: "#82C391" },
  { Ligne: "Ligne 6", color: "#F4A4BB" },
  { Ligne: "Ligne 7", color: "#82C391" },
  { Ligne: "Ligne 7bis", color: "#CFACD3" },
  { Ligne: "Ligne 8", color: "#D5C902" },
  { Ligne: "Ligne 9", color: "#E3B429" },
  { Ligne: "Ligne 10", color: "#8D5E2B" },
  { Ligne: "Ligne 11", color: "#06814F" },
  { Ligne: "Ligne 12", color: "#99D4E2" },
  { Ligne: "Ligne 13", color: "#652483" },
  { Ligne: "Ligne 14", color: "#652483" },
];
function lignes(data) {
  return data.features.filter((item) => lignesWithColors.Ligne.includes(item.properties.Ligne));
}
export default lignes;
