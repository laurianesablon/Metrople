import * as d3 from "d3";
import metroLinesData from "../data/metroLines.geojson";
import metroStationsData from "../data/metroStations.geojson";
import parisPerimeterData from "../data/parisPerimeter.geojson";
import { lignesWithColors } from '../data/lines';
import { useEffect, useRef } from "react";
import { renderStationPoints, renderMetroPaths, renderParisPerimeter } from "./mapElements";
import { useDispatch } from "react-redux";
import { setMetroLines, setMetroStations, setParisPerimeter } from "../store/store";

export function Map() {
  const width = 740;
  const height = 600;
  const svgRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
  
    const fetchData = async () => {
      const metroStations = await d3.json(metroStationsData);
      const metroLines = await d3.json(metroLinesData);
      const parisPerimeter = await d3.json(parisPerimeterData);
      
      dispatch(setMetroLines(metroLines));
      dispatch(setMetroStations(metroStations));
      dispatch(setParisPerimeter(parisPerimeter));
      
      renderStationPoints(metroStations, svg, height, width);
      renderMetroPaths(metroLines, svg);
      renderParisPerimeter(parisPerimeter, svg);
    };
  
    fetchData();
  }, []);

  return <svg ref={svgRef} width={width} height={height} />;
}