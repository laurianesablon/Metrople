import Layout from "../components/layout";
import Map from "../components/map";

export default function Home() {
  return (
    <>
      <Layout />
      <main>
        <div className="map_container">
          <Map />
        </div>
      </main>
    </>
  );
}
