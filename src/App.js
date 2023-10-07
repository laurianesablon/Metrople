import Layout from "./components/layout";
import { Map } from "./components/map";

function App() {
  return (
    <div className="App">
      <Layout />
      <main>
        <div className="map_container">
          <Map />
        </div>
      </main>
    </div>
  );
}

export default App;
