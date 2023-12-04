import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import {
  renderAllStationPoints,
  renderParisPerimeter,
  renderAllMetroPaths,
} from "../utils/mapElements";
import { useSelector } from "react-redux";
import { setStationColor } from "../utils/utils";

export default function Map({ stationInput, setStationsCount }) {
  const svgRef = useRef(null);
  const { metroStations, parisPerimeter, metroLines } = useSelector(
    (state) => state.data
  );

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const updateSize = () => {
      const width = svg.node().getBoundingClientRect().width;
      const height = svg.node().getBoundingClientRect().height;
      console.log(width, height);
      renderAllStationPoints(metroStations, svg, height, width);
      renderParisPerimeter(parisPerimeter, svg, height, width, metroStations);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, [metroStations, parisPerimeter]);

  useEffect(() => {
    setStationColor(stationInput, metroStations, setStationsCount);
  }, [stationInput, metroStations, setStationsCount]);

  return (
    <>
      <svg ref={svgRef} className="w-screen h-map" />
    </>
  );
}
