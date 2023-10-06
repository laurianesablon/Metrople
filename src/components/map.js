import React, { useEffect } from "react";
import * as d3 from "d3";
import data from "../data/data.geojson";
import lignes from "../data/lignes";
import { lignesWithColors } from '../data/lignes';
import traces from '../data/paths/metroPaths.geojson'
import paris from '../data/paths/paris.geojson';

export function Map() {
  const width = 700;
  const height = 650;
  const projection = d3.geoEqualEarth();
  let svg = d3.select("body").select("svg");

  if (svg.empty()) {
    svg = d3.select("body").append("svg")
      .attr("class", "map")
      .style("width", width)
      .style("height", height);
  }

  d3.json(data).then(function(station) {
    projection.fitSize([width, height], station);
    const geoGenerator = d3.geoPath().projection(projection);

    const paths = svg.selectAll('path')
    .data(station.features)
    .join('circle') // Change 'path' to 'circle' to render station points as circles
    .attr('cx', d => projection(d.geometry.coordinates)[0])
    .attr('cy', d => projection(d.geometry.coordinates)[1])
    .attr('r', 2.5) // Adjust the desired size of the station points
    .attr('class', 'station-point') 
    .attr('fill', (d) => {
      const color = lignesWithColors.find(ligne => ligne.Ligne === d.properties.Ligne);
      return color ? color.color : 'black';
    });

    d3.json(traces).then(function(tracesData) {
      const metroPaths = svg.selectAll('.metro-path')
        .data(tracesData.features)
        .join('path')
        .attr('class', 'metro-path')
        .attr('d', geoGenerator)
        .attr('stroke', (d) => {
            const color = lignesWithColors.find(ligne => ligne.Ligne === d.properties.Ligne);
            return color ? color.color : 'black';
          })
        .attr('stroke-width', 2)
        .attr('fill', 'none');
    });
    d3.json(paris).then(function(parisData) {
        const parisPaths = svg.selectAll('.paris-path')
          .data([parisData])
          .join('path')
          .attr('class', 'paris-path')
          .attr('d', geoGenerator)
          .attr('stroke', 'grey')
          .attr('stroke-width', 1)
          .attr('fill', 'none');
      });


  });

  return (
    <p>map</p>
  );
}