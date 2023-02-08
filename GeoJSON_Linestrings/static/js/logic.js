let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{style_id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        style_id: "streets-v11",
        accessToken: API_KEY
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{style_id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        style_id: "satellite-streets-v11",
        accessToken: API_KEY
});

var baseMaps = {
    "Streets": streets,
    "Satellite Streets": satelliteStreets
};

let map = L.map('mapid', {
    center: [43.7, -79.3],
    zoom: 11,
    layers: [satelliteStreets]
});

// Accessing the Toronto airline routes GeoJSON URL.
let torontoData = "https://raw.githubusercontent.com/btmeasles/Mapping_Earthquakes/GeoJSON_Polygons/GeoJSON_Polygons/torontoNeighborhoods.json"

// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
    onEachFeature: function(feature, layer) {
      layer.bindPopup(
        `Airline: ${feature.properties.airline}<hr class=rounded>Destination: ${feature.properties.dst}`)
    }}).setStyle(
    {
    color: "#FFFF66",
    weight: 2
    }).addTo(map);
});
L.control.layers(baseMaps).addTo(map)

