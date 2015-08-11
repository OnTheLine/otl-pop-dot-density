$(function() {
  // init the rangeslider
  $('input[type="range"]').rangeslider({

    // // Default CSS classes
    // rangeClass: 'rangeslider',
    // fillClass: 'rangeslider__fill',
    // handleClass: 'rangeslider__handle',

    polyfill: false, // appears to enable styling on slider

    // Callback function: brings to front the selected year layer
    onSlideEnd: function(position, value) {
      baseLayers[value.toString()].bringToFront();
    },
    // Callback function: generates the year that matches slider position
    onSlide: function(position, value) {
      $('#sliderOutput').html(value);
    }
  });

  var currentYear = 1900;
  // var clicked = false;
  //  $('.rangeslider__handle').click(function() {
  //        clicked = true;
  //  })

  // Autoplay one animation cycle by decade and generate year for display
  // Stop the loop when year reaches 2010
  // TO DO: restart when startAnimation button is clicked

  setInterval(function() {

        if (currentYear == 2010) {
        } else {
          currentYear+=10;
          baseLayers[currentYear.toString()].bringToFront();
          $('input[type="range"]').val(currentYear).change();
          $('#sliderOutput').html(currentYear);
        }
  }, 1000);

  // see ArcGIS Online My Content for extent of tile layer
  var southWest = L.latLng(40.946250, -73.765968),
    northEast = L.latLng(42.046797, -71.771949),
    bounds = L.latLngBounds(southWest, northEast);

  // set bounding box as maxBounds to restrict moving the map
  var map = L.map('map', {
    maxBounds: bounds,
    maxZoom: 11, // given that dots are randomly placed, it doesn't make sense to allow zooming further than this level
    minZoom: 8  // check on smaller devices
  });
  // zoom the map to bounding box
  map.fitBounds(bounds);

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
    }).addTo(map)  // no comma at the end of the list; first map last?
  };

  // style the town geojson outlines
  function style(feature) {
    return {
        color: 'red',
        weight: 0.5,
        fillOpacity: 0
    };
  }
// TO DO: fix this overlay layer so that features are clickable; is it hidden behind "bringToFront" of tiles?
  var towns = L.geoJson(data, {
    style: style,
    // onEachFeature: onEachFeature // Do I still need this?
  }).addTo(map);
  towns.bindPopup(function (feature) {
    return L.Util.template('<p>{Town}</p>', feature.properties);
  });

  // customize source link to your GitHub repo
       map.attributionControl
     .setPrefix('View <a href="http://github.com/jackdougherty/otl-historical-dot-density">open-source code on GitHub</a>, created with <a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>');

  }); // end of entire function
