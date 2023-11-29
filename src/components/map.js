import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import {
  renderAllStationPoints,
  renderAllMetroPaths,
  renderParisPerimeter,
  findStation,
} from "./mapElements";
import { useDispatch, useSelector } from "react-redux";
import { render } from "@testing-library/react";

export default function Map() {
  const svgRef = useRef(null);
  const dispatch = useDispatch();
  const [stationInput, setStationInput] = useState('');

  const onInputChange = (e) => {
    e.preventDefault();
    setStationInput(e.target.value);
  };
  const { metroStations, metroLines, parisPerimeter } =
    useSelector(state => state.data);

  const drawMap = () => {
    const svg = d3.select(svgRef.current);
    const { width, height } = { width: 740, height: 600 };
    renderAllStationPoints(metroStations, svg, height, width);
    renderParisPerimeter(
      parisPerimeter, svg, height, width, metroStations
    );
  };

  useEffect(drawMap, [metroStations, parisPerimeter]);

  useEffect(() => {
    if (stationInput) {
      const station = document.getElementById(stationInput);
      if (station) station.style.fill = "red";
    }
  }, [stationInput]);

  return (
    <>
      <form onSubmit={e => e.preventDefault()}>
        <input
          type="text"
          value={stationInput}
          onChange={onInputChange}
          placeholder="Enter station"
        />
        <button type="submit">Search</button>
      </form>
      <svg ref={svgRef} width="740" height="600" />
    </>
  );
}