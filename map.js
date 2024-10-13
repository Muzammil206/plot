
mapboxgl.accessToken = 'pk.eyJ1IjoibXV6YW1pbDIwNiIsImEiOiJjbGN5eXh2cW0wc2lnM290ZzJsZnNlbmxsIn0.o2Obvl7E_nQefSN34XsFmw';

// Initialize the map
const map = new mapboxgl.Map({
    container: 'map', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/light-v11', // style URL
    center: [3.498691, 6.656776], // starting position
    zoom: 18 // starting zoom
});

// Add zoom and rotation controls to the map
map.addControl(new mapboxgl.NavigationControl());

// Load the GeoJSON data and add to the map
map.on('load', function () {
    map.addSource('plots', {
        'type': 'geojson',
        'data': 'AG & HOMES SAVING & LOAN LIMITED LAYOUT lat long.geojson'  // Replace with the path to your GeoJSON file
    });

    // Add plots layer with styling based on status
    map.addLayer({
        'id': 'plots-layer',
        'type': 'fill',
        'source': 'plots',
        'layout': {},
        'paint': {
            'fill-color': [
                'match',
                ['get', 'TITLE'],  // 'status' is the property from your GeoJSON
                'ROAD', '#44ff44',
                'FIELD', '#ffcc00',
                'pending', '#ffcc00',
                '#ff4444'  // Default color
            ],
            'fill-opacity': 0.6,
            'fill-outline-color': '#000000'  // Border color
        }
    });

    // Add interactivity: popup on click
    map.on('click', 'plots-layer', function (e) {
        const PLOT_NUMBER = e.features[0].properties.PLOT_NUMBER;  // Assuming 'plot_id' is a property in your GeoJSON
        const TITLE = e.features[0].properties.TITLE;
        const PLOT_AREA = e.features[0].properties.PLOT_AREA;
        

       

        // Update the content of the details panel
        const detailsPanel = document.getElementById('details-panel');
        detailsPanel.innerHTML = '<h3>TITLE: ' + TITLE  + '</h3><p>PLOT_NUMBER: ' + PLOT_NUMBER+ '</p><p>PLOT_Area: ' + PLOT_AREA+ '</p>';
    });

    // Change the cursor to a pointer when hovering over a plot
    map.on('mouseenter', 'plots-layer', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Reset the cursor when not hovering over a plot
    map.on('mouseleave', 'plots-layer', function () {
        map.getCanvas().style.cursor = '';
    });
});

// Add a legend to the map
function addLegend() {
    const layers = ['Available', 'Sold', 'Pending'];
    const colors = ['#44ff44', '#ff4444', '#ffcc00'];

    for (var i = 0; i < layers.length; i++) {
        var legendItem = document.createElement('div');
        var colorBox = document.createElement('span');
        colorBox.style.backgroundColor = colors[i];
        colorBox.style.width = '15px';
        colorBox.style.height = '15px';
        colorBox.style.display = 'inline-block';
        legendItem.appendChild(colorBox);
        var label = document.createElement('span');
        label.textContent = ' ' + layers[i];
        legendItem.appendChild(label);
        document.getElementById('legend').appendChild(legendItem);
    }
}

addLegend();




