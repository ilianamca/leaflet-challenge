let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

let myMap = L.map("map", {
    center: [39.8283, -98.5795],
    zoom: 5
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

//setting circle size/color based on magnitude and depth
//depth = color
function markerColor(depth){
    if(depth <= 10){return '#2ECC71'}
    else if(depth <= 30 ){return '#F1C40F'}
    else if(depth <= 50){return '#D68910'}
    else if(depth <= 70){return '#CA6F1E'}
    else{return '#BA4A00'}
}
//magnitude = size of the marker
function markerSize(mag){
    if(mag == 0 ){return 1}
    else{return mag * 7}
}


d3.json(url).then(function(data){
//adding in the circles 
    L.geoJSON(data , {
        pointToLayer: function(feature, latlon){
            return L.circleMarker(latlon).bindPopup("<strong>" + feature.properties.place + 
            "</strong><br /><br />Magnitude: " + feature.properties.mag + 
            "</strong><br /><br />Depth: " + feature.geometry.coordinates[2])
        },
        style: function(feature){
            return{
                color: 'black', 
                fillColor: markerColor(feature.geometry.coordinates[2]),
                radius: markerSize(feature.properties.mag),
                fillOpacity: 0.5,
                weight: 1
            }
        }

    //creating/adding the legend to the map
    }).addTo(myMap)
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend"), 
        levels = [0, 20, 40, 60, 80];

        div.innerHTML += "<h3>Depth</h3>"

        for (var i = 0; i < levels.length; i++) {
            div.innerHTML += '<i style="background: ' + markerColor(levels[i] + 1) + '"></i> ' + "  " +
            levels[i] + " " + (levels[i + 1] ? ' &ndash; ' + levels[i + 1] + ' <br> ' : '+');
        }
        return div;
    };
    
    legend.addTo(myMap);


});














// let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// // Perform a GET request to the query URL/
// d3.json(queryUrl).then(function (data) {
//     // Once we get a response, send the data.features object to the createFeatures function.
//     createFeatures(data.features);
//   });

//   function createFeatures(earthquakeData) {

//     // Define a function we want to run once for each feature in the features array
//   // Give each feature a popup describing the place and time of the earthquake
//   function onEachFeature(feature, layer) {
//     layer.bindPopup("<h3>" + feature.properties.place +
//       "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" + "<h4> Magnitude: " + feature.properties.mag +"</h4>");
//   }

//     // Color of circles
//     function QuakeColor(Qcolor) {
//     switch(true) {
//         case (0 <= Qcolor && Qcolor <= 1.0):
//           return "Red";
//         case (1.0 <= Qcolor && Qcolor <= 2.0):
//             return "Orange";
//         case (2.0 <= Qcolor && Qcolor<= 3.0):
//           return "Yellow";
//         case (3.0 <= Qcolor && Qcolor<= 4.0):
//             return "Green";
//         case (4.0 <= Qcolor && Qcolor<= 5.0):
//             return "Blue";
//         case (5.0 <= Qcolor && Qcolor <= 6.0):
//           return "Indigo";
//         default:
//           return "Violet";
//     }
//   }

//   function CircleMaker(features, latlng){
//     var CircleOptions = {
//         radius: features.properties.mag * 8,
//         fillColor: QuakeColor(features.properties.mag),
//         color: QuakeColor(features.properties.mag),
//         opacity: 1.0,
//         fillOpacity: .5

//     }
//     return L.circleMarker(latlng, CircleOptions)
// }
// // Create a GeoJSON layer containing the features array on the earthquakeData object
//   // Run the onEachFeature function once for each piece of data in the array
//   var earthquakes = L.geoJSON(earthquakeData, {
//     onEachFeature: onEachFeature,
//     pointToLayer: CircleMaker
//   });

//   // Sending our earthquakes layer to the createMap function
//   createMap(earthquakes);
// }

//  // Define streetmap and Satellite layers
//   var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: "mapbox/streets-v11",
//     accessToken: API_KEY
//   });

//   var Satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href= \"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "satellite-v9",
//     accessToken: API_KEY
//   });


//   var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: "mapbox/light-v10",
//     accessToken: API_KEY
//   });

