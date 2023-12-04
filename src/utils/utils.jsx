import { linesWithColors } from "../data/lines";

export const setStationColor = (input, stationsData, updateCount) => {
  if (!input || !stationsData.features) return;
  const normalizedInput = input.trim().toLowerCase();
  const newlyDiscoveredStations = [];

  stationsData.features.forEach(({ properties }) => {
    if (properties.stop_name.toLowerCase() === normalizedInput) {
      setStationElementColor(properties, newlyDiscoveredStations);
    }
  });

  updateCountIfNeeded(newlyDiscoveredStations, updateCount);
};

const setStationElementColor = (properties, newlyDiscoveredStations) => {
  const stationClass = properties.stop_name
    .replace(/\s+/g, "-")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
  const ligneClass = `${properties.Ligne.replace(/\s+/g, "-")}`;
  const stationElement = document.querySelector(
    `.${stationClass}.${ligneClass}`
  );

  if (stationElement) {
    const lineColor = getLineColor(properties);

    if (lineColor && stationElement.style.fill !== lineColor) {
      stationElement.style.fill = lineColor;
      newlyDiscoveredStations.push(`.${stationClass}.${ligneClass}`);
    }
  }
};
const getLineColor = (properties) => {
  return linesWithColors.find(({ Ligne }) => Ligne === properties.Ligne)?.color;
};

const updateCountIfNeeded = (newlyDiscoveredStations, updateCount) => {
  if (newlyDiscoveredStations.length > 0) {
    updateCount((count) => count + newlyDiscoveredStations.length);
  }
};
