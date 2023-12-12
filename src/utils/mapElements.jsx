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
    .attr("fill","transparent");
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

export function add3DBuildings(map) {
  const layers = map.getStyle().layers;
  const labelLayerIdx = layers.findIndex(
    (layer) => layer.type === "symbol" && layer.layout["text-field"]
  );
  const labelLayerId = layers[labelLayerIdx].id;

  map.addLayer({
    id: "3d-buildings",
    source: "composite",
    "source-layer": "building",
    filter: ["==", "extrude", "true"],
    type: "fill-extrusion",
    minzoom: 15,
    paint: {
      "fill-extrusion-color": "#aaa",
      "fill-extrusion-height": [
        "interpolate", ["linear"], ["zoom"],
        15, 0, 15.05, ["get", "height"]
      ],
      "fill-extrusion-base": [
        "interpolate", ["linear"], ["zoom"],
        15, 0, 15.05, ["get", "min_height"]
      ],
      "fill-extrusion-opacity": 0.6
    }
  }, labelLayerId);
}
