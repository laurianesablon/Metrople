import * as d3 from "d3";
import { linesWithColors } from "../data/lines";

let geoGenerator = undefined;
export const renderAllStationPoints = (station, svg, height, width) => {
  const projection = d3.geoMercator().fitSize([width, height], station);
  geoGenerator = d3.geoPath().projection(projection);
  const paths = svg
    .selectAll("circle")
    .data(station.features)
    .join("circle")
    .attr("cx", (d) => projection(d.geometry.coordinates)[0])
    .attr("cy", (d) => projection(d.geometry.coordinates)[1])
    .attr("r", 2.5)
    .attr(
      "class",
      (d) =>
        `${d.properties.stop_name.replace(/\s+/g, "-")}` +
        ` ${d.properties.Ligne.replace(/\s+/g, "-")}`
    )
    .attr("fill", "transparent");
};

export const setStationColor = (input, stationsData, updateCount) => {
  if (!input || !stationsData.features) return;

  const normalizedInput = input.trim().toLowerCase();
  const newlyDiscoveredStations = [];

  stationsData.features.forEach(({ properties }) => {
    if (properties.stop_name.toLowerCase() === normalizedInput) {
      const stationClass = properties.stop_name.replace(/\s+/g, "-").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
      const ligneClass = `${properties.Ligne.replace(/\s+/g, "-")}`;
      const stationElement = document.querySelector(`.${stationClass}.${ligneClass}`);
      // console.log(stationElement);
      // console.log(ligneClass);

      if (stationElement) {
        const lineColor = linesWithColors.find(
          ({ Ligne }) => Ligne === properties.Ligne
        )?.color;

        if (lineColor && stationElement.style.fill !== lineColor) {
          stationElement.style.fill = lineColor;
          newlyDiscoveredStations.push(`.${stationClass}.${ligneClass}`);
        }
      }
    }
  });

  if (newlyDiscoveredStations.length > 0) {
    updateCount((count) => count + newlyDiscoveredStations.length);
  }
};
export const renderAllMetroPaths = (tracesData, svg) => {
  const metroPaths = svg
    .selectAll(".metro-path")
    .data(tracesData.features)
    .join("path")
    .attr("class", "metro-path")
    .attr("d", geoGenerator)
    .attr("stroke", (d) => {
      const color = linesWithColors.find(
        (ligne) => ligne.Ligne === d.properties.Ligne
      );
      return color ? color.color : "black";
    })
    .attr("stroke-width", 2)
    .attr("fill", "none");
};

export const renderParisPerimeter = (
  parisPerimeter,
  svg,
  height,
  width,
  station
) => {
  const projection = d3.geoMercator().fitSize([width, height], station);
  geoGenerator = d3.geoPath().projection(projection);
  const parisPaths = svg
    .selectAll(".paris-path")
    .data([parisPerimeter])
    .join("path")
    .attr("class", "paris-path")
    .attr("d", geoGenerator)
    .attr("stroke", "grey")
    .attr("stroke-width", 1)
    .attr("fill", "none");
};

export function findStation(list, stationName) {
  for (let i = 0; i < list.length; i++) {
    let item = list[i];
    if (item.properties.stop_name.includes(stationName)) {
      // console.log(item);
      return item;
    }
  }

  return null;
}
