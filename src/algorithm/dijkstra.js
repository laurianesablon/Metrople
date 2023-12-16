import metroStationsData from "../data/metroStations.json";

// Initialize the graph object.
export const metroGraph = initializeGraph(metroStationsData.features);

export function initializeGraph(features) {
  const graph = {};

  features.forEach((station) => {
    const { stop_name, Ligne } = station.properties;
    if (!graph[stop_name]) {
      graph[stop_name] = { lines: {} };
    }
    if (!graph[stop_name].lines[Ligne]) {
      graph[stop_name].lines[Ligne] = {
        neighbors: []
      };
    }
  });

  // Add neighbors and correspondences to each station.
  features.forEach((station, idx) => {
    const { stop_name, Ligne } = station.properties;
    const neighbors = getNeighbors(idx, features);
    const correspondences = findCorrespondences(station, features);

    // Add neighbors to the current line.
    neighbors.forEach((neighbor) => {
      const neighborName = neighbor.properties.stop_name;
      graph[stop_name].lines[Ligne].neighbors.push(neighborName);
    });

    // Add correspondences as neighbors across different lines.
    correspondences.forEach((corresp) => {
      const correspName = corresp.properties.stop_name;
      const correspLine = corresp.properties.Ligne;
      if (!graph[stop_name].lines[correspLine]) {
        graph[stop_name].lines[correspLine] = {
          neighbors: []
        };
      }
      graph[stop_name].lines[correspLine].neighbors.push(correspName);
    });
  });

  return graph;
}

function getNeighbors(index, features) {
  const previous = features[index - 1];
  const next = features[index + 1];
  return [previous, next].filter(Boolean); // Filters out undefined values
}

function findCorrespondences(station, features) {
  return features.filter((feature) =>
    feature.properties.stop_name === station.properties.stop_name &&
    feature.properties.Ligne !== station.properties.Ligne
  );
}

// The metroGraph object is now ready for use in Dijkstra's algorithm.
console.log(metroGraph);
const stationCount = Object.keys(metroGraph).length;
console.log(stationCount); 