// Create the map object with center and zoom level.
let map = L.map('mapid').setView([30, 30], 2); 

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    Street: streets,
    Dark: dark
  };

// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/btmeasles/Mapping_Earthquakes/main/majorAirports.json";

d3.json(airportData).then(function(data) {
    console.log(data);
    L.geoJson(data, {
        onEachFeature: function(feature, layer) {
          layer.bindPopup(
            `ID: ${feature.properties.id}<hr class=rounded>Airport Name: ${feature.properties.name}`)}})
    .addTo(map)
    });

