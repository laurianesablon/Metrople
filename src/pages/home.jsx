import Layout from "../components/layout";
import Map from "../components/map";
import { useState } from "react";

export default function Home() {
  const [stationInput, setStationInput] = useState("");
  const [stationCount, setStationsCount] = useState(0);


  const onInputChange = (e) => {
    e.preventDefault();
    setStationInput(e.target.value);
  };
  return (
    <>
      <Layout />
      <main className="flex flex-col justify-center items-center bg-black">
        <div className="w-full">
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              value={stationInput}
              onChange={onInputChange}
              placeholder="Enter station"
              className="font-mono"
            />
          </form>
          <p>{stationCount}/308</p>
          <Map stationInput={stationInput} setStationsCount={setStationsCount} />
        </div>
      </main>
    </>
  );
}
