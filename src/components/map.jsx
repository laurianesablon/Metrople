import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import {
  renderAllStationPoints,
  renderParisPerimeter,
  setStationColor,
} from "./mapElements";
import {useSelector } from "react-redux";

export default function Map() {
  const svgRef = useRef(null);
  const [stationInput, setStationInput] = useState("");
  const { metroStations, parisPerimeter } = useSelector((state) => state.data);
  const [stationCount, setStationsCount] = useState(0);

  const drawMap = () => {
    const svg = d3.select(svgRef.current);
    const { width, height } = { width: 740, height: 600 };
    renderAllStationPoints(metroStations, svg, height, width);
    renderParisPerimeter(parisPerimeter, svg, height, width, metroStations);
  };

  useEffect(drawMap, [metroStations, parisPerimeter]);

  useEffect(() => {
    setStationColor(stationInput, metroStations, setStationsCount);
  }, [stationInput, metroStations, setStationsCount]);

  const onInputChange = (e) => {
    e.preventDefault();
    setStationInput(e.target.value);
  };
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={stationInput}
          onChange={onInputChange}
          placeholder="Enter station"
        />
        <button type="submit">Search</button>
      </form>
      <p>{stationCount}/308</p>
      <svg ref={svgRef} width="740" height="600" />
    </>
  );
}
