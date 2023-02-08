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

let earthquakes = new L.layerGroup();
let overlays = {
  Earthquakes: earthquakes
};

let map = L.map('mapid', {
    center: [39.5,-98.5],
    zoom: 3,
    layers: [streets]
});

function styleInfo(feature) {
    return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag),
        color: '#000000',
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
    };
}

function getColor(magnitude) {
  if (magnitude > 5) {
    return "#ea2c2c";
  }
  if (magnitude > 4) {
    return "#ea822c";
  }
  if (magnitude > 3) {
    return "#ee9c00";
  }
  if (magnitude > 2) {
    return "#eecc00";
  }
  if (magnitude > 1) {
    return "#d4ee00";
  }
  return "#98ee00";
}

// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }

// Grabbing our GeoJSON data.
// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
    pointToLayer: function(feature, latlng) {
        console.log(data);
        return L.circleMarker(latlng);
    },
    style: styleInfo,
    onEachFeature: function(feature, layer) {
      layer.bindPopup(`Magnitude: ${feature.properties.mag}<br>Location: ${feature.properties.place}`)
    }
  }).addTo(earthquakes);
});
earthquakes.addTo(map);

var legend = L.control({
  position: 'bottomright'
});

legend.onAdd = function () {

    let div = L.DomUtil.create
    ('div', 'info legend')
    const magnitudes = [0,1,2,3,4,5]
    const colors = [
      "#98ee00",
      "#d4ee00",
      "#eecc00",
      "#ee9c00",
      "#ea822c",
      "#ea2c2c"
    ];

    // Looping through our intervals to generate a label with a colored square for each interval.
   for (var i = 0; i < magnitudes.length; i++) {
    console.log(colors[i]);
    div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " +
      magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
 }

    return div;
};

legend.addTo(map);

L.control.layers(baseMaps, overlays).addTo(map)

