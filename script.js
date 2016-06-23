$(function() {
  // init the rangeslider
  $('input[type="range"]').rangeslider({
    polyfill: false, // appears to enable styling on slider
    // Callback function: brings to front the selected year layer
    onSlideEnd: function(position, value) {
      baseLayers[value.toString()].bringToFront();
    },
    // Callback function: generates year to match slider position
    onSlide: function(position, value) {
      $('#sliderOutput').html(value);
    }
  });

  // Autoplay on startup, stop at 2010, with replay button
  var currentYear = 1900;

  $(".replayButton").click(function() {
     $(".leaflet-marker-icon, .leaflet-shadow-pane").fadeOut(200);
     currentYear = 1900;
    //  setInterval();
    });

  setInterval(function() {
        if (currentYear == 2010) {
        } else {
          currentYear+=10;
          baseLayers[currentYear.toString()].bringToFront();
          $('input[type="range"]').val(currentYear).change();
          $('#sliderOutput').html(currentYear);
        }
  }, 1000);

  var map = L.map('map', {
    center: [41.5, -72.7], // [41.5, -72.7] for Connecticut; [41.76, -72.67] for Hartford county or city
    zoom: 9, // zoom 9 for Connecticut; 10 for Hartford county, 12 for Hartford city
    maxZoom: 11,
    scrollWheelZoom: false
  });

  // set base layers, with the first to be added to the map on startup
  var baseLayers = {
    "1900": L.esri.tiledMapLayer({
      url: "http://tiles.arcgis.com/tiles/5rblLCKLgS4Td60j/arcgis/rest/services/CTPopDot1900/MapServer"
    }).addTo(map),
    "1910": L.esri.tiledMapLayer({
      url: "http://tiles.arcgis.com/tiles/5rblLCKLgS4Td60j/arcgis/rest/services/CTPopDot1910/MapServer"
    }).addTo(map),
    "1920": L.esri.tiledMapLayer({
      url: "http://tiles.arcgis.com/tiles/5rblLCKLgS4Td60j/arcgis/rest/services/CTPopDot1920/MapServer"
    }).addTo(map),
    "1930": L.esri.tiledMapLayer({
      url: "http://tiles.arcgis.com/tiles/5rblLCKLgS4Td60j/arcgis/rest/services/CTPopDot1930/MapServer"
    }).addTo(map),
    "1940": L.esri.tiledMapLayer({
      url: "http://tiles.arcgis.com/tiles/5rblLCKLgS4Td60j/arcgis/rest/services/CTPopDot1940/MapServer"
    }).addTo(map),
    "1950": L.esri.tiledMapLayer({
      url: "http://tiles.arcgis.com/tiles/5rblLCKLgS4Td60j/arcgis/rest/services/CTPopDot1950/MapServer"
    }).addTo(map),
    "1960": L.esri.tiledMapLayer({
      url: "http://tiles.arcgis.com/tiles/5rblLCKLgS4Td60j/arcgis/rest/services/CTPopDot1960/MapServer"
    }).addTo(map),
    "1970": L.esri.tiledMapLayer({
      url: "http://tiles.arcgis.com/tiles/5rblLCKLgS4Td60j/arcgis/rest/services/CTPopDot1970/MapServer"
    }).addTo(map),
    "1980": L.esri.tiledMapLayer({
      url: "http://tiles.arcgis.com/tiles/5rblLCKLgS4Td60j/arcgis/rest/services/CTPopDot1980/MapServer"
    }).addTo(map),
    "1990": L.esri.tiledMapLayer({
      url: "http://tiles.arcgis.com/tiles/5rblLCKLgS4Td60j/arcgis/rest/services/CTPopDot1990/MapServer"
    }).addTo(map),
    "2000": L.esri.tiledMapLayer({
      url: "http://tiles.arcgis.com/tiles/5rblLCKLgS4Td60j/arcgis/rest/services/CTPopDot2000/MapServer"
    }).addTo(map),
    "2010": L.esri.tiledMapLayer({
      url: "http://tiles.arcgis.com/tiles/5rblLCKLgS4Td60j/arcgis/rest/services/CTPopDot2010/MapServer"
    }).addTo(map)  // no comma at the end of the list
  };

  // style the town geojson outlines
  function style(feature) {
    return {
        color: 'red',
        weight: 0.5,
        fillOpacity: 0
    };
  }
  // make town name visible on click
  function onEachFeature( feature, layer) {
  	layer.bindPopup(feature.properties.Town)
  }

  var towns = L.geoJson(data, {
    style: style,
    onEachFeature: onEachFeature
  }).addTo(map);

  // customize source link to your GitHub repo
       map.attributionControl
     .setPrefix('View <a href="http://github.com/jackdougherty/otl-historical-dot-density" target="_blank"> code on GitHub</a>, created with <a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>');

}); // end of entire function
