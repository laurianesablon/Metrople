import * as d3 from "d3";
import data from "../data/data.geojson";
import { lignesWithColors } from '../data/lignes';
import traces from '../data/paths/metroPaths.geojson'
import paris from '../data/paths/paris.geojson';
import { useEffect, useRef } from "react";
import { renderStationPoints, renderMetroPaths, renderParisPerimeter } from "./mapElements";

export function Map() {
  const width = 740;
  const height = 600;
  const projection = d3.geoEqualEarth();
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
  
    const fetchData = async () => {
      const station = await d3.json(data);
      const tracesData = await d3.json(traces);
      const parisPerimeter = await d3.json(paris);
  
      renderStationPoints(station, svg, height, width);
      renderMetroPaths(tracesData, svg, height, width);
      renderParisPerimeter(parisPerimeter, svg, height, width);
    };
  
    fetchData();
  }, []);

  return <svg ref={svgRef} width={width} height={height} />;
}