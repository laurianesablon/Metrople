import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { MAPBOX_ACCESS_TOKEN } from "../utils/config.jsx";
import { renderAllMetroPaths } from "../utils/mapElements.jsx";
import { renderParisPerimeter } from "../utils/mapElements.jsx";
import { setStationColor } from "../utils/utils.jsx";
import metroLinesData from "../data/metroLines.json";
import metroStationsData from "../data/metroStations.json";

export default function ParisMap({ stationInput, setStationsCount }) {
  const [foundStations, setFoundStations] = useState([]);
  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/dark-v11",
      center: [2.349014, 48.864716],
      zoom: 11,
      pitch: 40,
    });
    map.on("style.load", () => {
      const layers = map.getStyle().layers;
      const labelLayerId = layers.find(
        (layer) => layer.type === "symbol" && layer.layout["text-field"]
      ).id;

      map.addLayer(
        {
          id: "add-3d-buildings",
          source: "composite",
          "source-layer": "building",
          filter: ["==", "extrude", "true"],
          type: "fill-extrusion",
          minzoom: 15,
          paint: {
            "fill-extrusion-color": "#aaa",
            "fill-extrusion-height": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "height"],
            ],
            "fill-extrusion-base": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "min_height"],
            ],
            "fill-extrusion-opacity": 0.6,
          },
        },
        labelLayerId
      );

      // const popup = new mapboxgl.Popup({ offset: 25 }).setText(
      //   station.properties.stop_name
      // );
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      map.on("mouseenter", "metro-stations", (e) => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = "pointer";

        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        const stationName = e.features[0].properties.stop_name;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(stationName).addTo(map);
      });

      map.on("mouseleave", "metro-stations", () => {
        map.getCanvas().style.cursor = "";
        popup.remove();
      });

      //   new mapboxgl.Marker()
      //     .setLngLat(station.geometry.coordinates)
      //     .setPopup(popup)
      //     .addTo(map);
      // });

      // Render metro lines
      map.addSource("metro-lines", {
        type: "geojson",
        data: metroLinesData,
      });

      map.addSource("metro-stations", {
        type: "geojson",
        data: metroStationsData,
      });
      map.addLayer(
        {
          id: "metro-stations",
          type: "circle",
          source: "metro-stations",
          paint: {
            "circle-color": ["get", "route_color"],
            "circle-radius": 3,
          },
        },
        labelLayerId
      );
    });
  }, []);

  return <div id="map" style={{ width: "800px", height: "600px" }}></div>;
}
