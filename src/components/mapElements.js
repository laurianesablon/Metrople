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
    .attr("id", d => `${d.properties.stop_name}`)
    .attr("class", d => `${d.properties.Ligne}`)
    .attr("fill", "transparent");
};

export const colorChosenStation = (stationInput, metroStations, setNumberOfStations) => {
  if (stationInput && metroStations.features) {
    const stationsFound = metroStations.features.filter(
      (feature) => feature.properties.stop_name === stationInput
    );
    if (stationsFound.length > 0) {
      setNumberOfStations(prevNumberOfStations => prevNumberOfStations + stationsFound.length);
      stationsFound.forEach((station) => {
        const color = linesWithColors.find(ligne => ligne.Ligne === station.properties.Ligne);
        const stationElement = document.getElementById(stationInput);
        if (stationElement) {
          stationElement.style.fill = color.color;
        }
      });
    }
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
