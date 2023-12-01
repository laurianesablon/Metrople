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
    .attr("class", "station-point")
    .attr("id", d => `${d.properties.stop_name.replace(/\s+/g, '-').toLowerCase()}`)
    .attr("class", d => `${d.properties.Ligne.replace(/\s+/g, '-')}`)
    .attr("fill", "transparent");
};

export const setStationColor = (input, stationsData, updateCount) => {
  if (!input || !stationsData.features) return;

  const formattedInput = input.trim().toLowerCase().replace(/\s+/g, '-');
  const foundStations = stationsData.features.filter(
    ({ properties }) => 
      properties.stop_name.toLowerCase() === input.toLowerCase()
  );

  if (foundStations.length === 0) return;

  updateCount(count => count + foundStations.length);

  foundStations.forEach(({ properties }) => {
    const lineColor = linesWithColors.find(
      ({ Ligne }) => Ligne === properties.Ligne
    )?.color;

    const elementId = document.getElementById(formattedInput);
    if (elementId && lineColor) {
      elementId.style.fill = lineColor;
    }
  });
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

export const renderParisPerimeter = (parisPerimeter, svg, height, width, station) => {
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
