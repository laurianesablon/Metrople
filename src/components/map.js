import * as d3 from "d3";

import { useRef } from "react";
import { renderStationPoints, renderMetroPaths, renderParisPerimeter } from "./mapElements";
import { useDispatch, useSelector } from "react-redux";

export default function Map() {
  const width = 740;
  const height = 600;
  const svgRef = useRef(null);
  const dispatch = useDispatch();
  const svg = d3.select(svgRef.current);

  const metroStations = useSelector((state) => state.data.metroStations);
  const metroLines = useSelector((state) => state.data.metroLines);
  const parisPerimeter = useSelector((state) => state.data.parisPerimeter);

    renderStationPoints(metroStations, svg, height, width);
    renderMetroPaths(metroLines, svg);
    renderParisPerimeter(parisPerimeter, svg);
  return <svg ref={svgRef} width={width} height={height} />;
}