import * as d3 from "d3";
import { lignesWithColors } from '../data/lignes';

export const renderStationPoints = (station, svg, height, width) => {
    const projection = d3.geoMercator().fitSize([width, height], station);
    const geoGenerator = d3.geoPath().projection(projection);
    const paths = svg
      .selectAll("circle")
      .data(station.features)
      .join("circle")
      .attr("cx", (d) => projection(d.geometry.coordinates)[0])
      .attr("cy", (d) => projection(d.geometry.coordinates)[1])
      .attr("r", 2.5)
      .attr("class", "station-point")
      .attr("fill", (d) => {
        const color = lignesWithColors.find(
          (ligne) => ligne.Ligne === d.properties.Ligne
        );
        return color ? color.color : "black";
      });
  };

  export const renderMetroPaths = (tracesData, svg, height, width) => {
    const projection = d3.geoMercator().fitSize([width, height], tracesData);
    const geoGenerator = d3.geoPath().projection(projection);
    const metroPaths = svg
      .selectAll(".metro-path")
      .data(tracesData.features)
      .join("path")
      .attr("class", "metro-path")
      .attr("d", geoGenerator)
      .attr("stroke", (d) => {
        const color = lignesWithColors.find(
          (ligne) => ligne.Ligne === d.properties.Ligne
        );
        return color ? color.color : "black";
      })
      .attr("stroke-width", 2)
      .attr("fill", "none");
  };

  export const renderParisPerimeter = (parisPerimeter, svg, height, width) => {
    const projection = d3.geoMercator().fitSize([width, height], parisPerimeter);
    const geoGenerator = d3.geoPath().projection(projection);
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