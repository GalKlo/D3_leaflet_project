// Create an initial map object:
let myMap = L.map("map", {
    center: [39.82, -98.57],
    zoom: 5
});

// Add a tile layer:
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Fetch the JSON data 
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
d3.json(url).then(function (data) {

    // Define size of a marker based on the magnitude level
    function markerSize(magnitudeValue) {
        if (magnitudeValue == 0) return 1;
        else return magnitudeValue * 5500;
    }

    // Define color of a marker based on the depth value
    function chooseColor(depthValue) {
        if (depthValue >= 90) return "#FF6668";
        else if (depthValue >= 70) return "#FFA767";
        else if (depthValue >= 50) return "#FFBB45";
        else if (depthValue >= 30) return "#F7DE43";
        else if (depthValue >= 10) return "#D2F645";
        else if (depthValue >= -10) return "#87F844";
    }

    // Loop through data featuers array and create marker for each earthquake event 
    for (let i = 0; i < data.features.length; i++) {

        let coordinates = [data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]];
        let circleSize = markerSize(data.features[i].properties.mag);
        let depth = data.features[i].geometry.coordinates[2];
        let date = new Date(data.features[i].properties.time);
        let addInfo = `<h3>${data.features[i].properties.place}</h3> <hr> 
                        <p>Date: ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}</p>
                        <p>Magnitude: ${data.features[i].properties.mag}</p> 
                        <p>Depth: ${depth}</p>`;

        L.circle(coordinates, {
            color: "grey",
            weight: 1,
            fillColor: chooseColor(depth),
            fillOpacity: 0.86,
            radius: circleSize,
            // Binde a popup with additional info 
        }).bindPopup(addInfo).addTo(myMap);
    }

    // Set up the legend.
    let legend = L.control({ position: "bottomright" });
    legend.onAdd = function () {
        let div = L.DomUtil.create("div", "legend");
        let depthList = [-10,10,30,50,70,90];

        div.innerHTML = "<h3>Depth scale</h3>";
        for (let i=0; i < depthList.length; i++) {
            let color = chooseColor(depthList[i]);
            const label = depthList[i] + (depthList[i + 1] ? '&ndash;' + (depthList[i + 1]) : '+');
            div.innerHTML += "<i style=\"background-color: " + color + "\"></i>" + label + '<br>';
        }
        return div;
    };

    // Add the legend to the map
    legend.addTo(myMap);

}
)

