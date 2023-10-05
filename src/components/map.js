import React, { useEffect } from "react";
import * as d3 from "d3";
import data from "../data/data.geojson";
import lignes from "../data/lignes";
import { lignesWithColors } from '../data/lignes';
import traces from '../data/traces/traces.geojson'

export function Map() {
  const width = 800;
  const height = 800;
  const projection = d3.geoEqualEarth();
  let svg = d3.select("body").select("svg");

  if (svg.empty()) {
    svg = d3.select("body").append("svg")
      .style("width", width)
      .style("height", height);
  }

  d3.json(data).then(function(bb) {
    projection.fitSize([width, height], bb);
    const geoGenerator = d3.geoPath().projection(projection);

    const paths = svg.selectAll('path')
      .data(bb.features)
      .join('path')
      .attr('d', geoGenerator)
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
  });

  return (
    <p>map</p>
  );
}