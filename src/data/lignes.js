import data from "./data.geojson";

 const lignes= fetch(data).then(response => response.json()
).then(data => {
    return {
    ligne_1: data.features.filter(item => item.properties.Ligne === "Ligne 1"),
    ligne_2: data.features.filter(item => item.properties.Ligne === "Ligne 2"),
    ligne_3: data.features.filter(item => item.properties.Ligne === "Ligne 3"),
    ligne_3bis: data.features.filter(item => item.properties.Ligne === "Ligne 3bis"),
    ligne_4: data.features.filter(item => item.properties.Ligne === "Ligne 4"),
    ligne_5: data.features.filter(item => item.properties.Ligne === "Ligne 5"),
    ligne_6: data.features.filter(item => item.properties.Ligne === "Ligne 6"),
    ligne_7: data.features.filter(item => item.properties.Ligne === "Ligne 7"),
    ligne_7bis: data.features.filter(item => item.properties.Ligne === "Ligne 7bis"),
    ligne_8: data.features.filter(item => item.properties.Ligne === "Ligne 8"),
    ligne_9: data.features.filter(item => item.properties.Ligne === "Ligne 9"),
    ligne_10: data.features.filter(item => item.properties.Ligne === "Ligne 10"),
    ligne_11: data.features.filter(item => item.properties.Ligne === "Ligne 11"),
    ligne_12: data.features.filter(item => item.properties.Ligne === "Ligne 12"),
    ligne_13: data.features.filter(item => item.properties.Ligne === "Ligne 13"),
    ligne_14: data.features.filter(item => item.properties.Ligne === "Ligne 14"),
    
  };

})
export default lignes;

