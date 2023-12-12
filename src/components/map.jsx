import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { MAPBOX_ACCESS_TOKEN } from "../utils/config.jsx";
import metroLinesData from "../data/metroLines.json";
import metroStationsData from "../data/metroStations.json";

const emptyGeoJSONTemplate = {
  type: "FeatureCollection",
  name: "jsontemplate",
  features: [],
};

export default function ParisMap({ stationInput, setStationsCount }) {
  const [foundStations, setFoundStations] = useState(emptyGeoJSONTemplate);

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

      map.addLayer({
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
      }, labelLayerId);

      map.addSource("metro-lines", {
        type: "geojson",
        data: metroLinesData,
      });

      map.addSource("metro-stations", {
        type: "geojson",
        data: foundStations,
      });

      map.addLayer({
        id: "metro-stations",
        type: "circle",
        source: "metro-stations",
        paint: {
          "circle-color": ["get", "route_color"],
          "circle-radius": 3,
        },
      }, labelLayerId);
    });

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    });

    map.on("mouseenter", "metro-stations", (e) => {
      map.getCanvas().style.cursor = "pointer";

      const coordinates = e.features[0].geometry.coordinates.slice();
      const stationName = e.features[0].properties.stop_name;

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      popup.setLngLat(coordinates).setHTML(stationName).addTo(map);
    });

    map.on("mouseleave", "metro-stations", () => {
      map.getCanvas().style.cursor = "";
      popup.remove();
    });
  }, [foundStations]);

  useEffect(() => {
    const matchingStations = metroStationsData.features.filter(
      (station) => station.properties.stop_name.toLowerCase() === stationInput.toLowerCase()
    );

    if (matchingStations.length > 0) {
      setFoundStations({
        type: "FeatureCollection",
        name: "jsontemplate",
        features: [...foundStations.features, ...matchingStations],
      });
      setStationsCount(foundStations.features.length + matchingStations.length);
    }
  }, [stationInput]);

  return <div id="map" style={{ width: "800px", height: "600px" }}></div>;
}
