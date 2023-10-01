import React, { useEffect } from "react";
import * as d3 from "d3";
import data from "../data/data.geojson";
import lignes from "../data/lignes";

export function Map() {
  const width = 800;
  const height = 800;
  const projection = d3.geoEqualEarth();
  const svg = d3.select("body")
      .append('svg')
      .style("width", width)
      .style("height", height);
  d3.json(data).then(function(bb) {
      projection.fitSize([width, height], bb);
      const geoGenerator = d3.geoPath().projection(projection);
 
      svg.append('g')
          .selectAll('path')
          .data(bb.features)
          .join('path')
          .attr('d', geoGenerator)
          .attr('fill', '#088')
          .attr('stroke', '#000');
  });

  return (
      <p>map</p>
  );
}
