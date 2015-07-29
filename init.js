$(function() {

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
    }),
    "1920": L.esri.tiledMapLayer({
      url: "http://tiles.arcgis.com/tiles/5rblLCKLgS4Td60j/arcgis/rest/services/CTPopDot1920/MapServer"
    }),
    "1930": L.esri.tiledMapLayer({
      url: "http://tiles.arcgis.com/tiles/5rblLCKLgS4Td60j/arcgis/rest/services/CTPopDot1930/MapServer"
    }),
    "1940": L.esri.tiledMapLayer({
      url: "http://tiles.arcgis.com/tiles/5rblLCKLgS4Td60j/arcgis/rest/services/CTPopDot1940/MapServer"
    }),
    "1950": L.esri.tiledMapLayer({
      url: "http://tiles.arcgis.com/tiles/5rblLCKLgS4Td60j/arcgis/rest/services/CTPopDot1950/MapServer"
    }),
    "1960": L.esri.tiledMapLayer({
      url: "http://tiles.arcgis.com/tiles/5rblLCKLgS4Td60j/arcgis/rest/services/CTPopDot1960/MapServer"
    }),
    "1970": L.esri.tiledMapLayer({
      url: "http://tiles.arcgis.com/tiles/5rblLCKLgS4Td60j/arcgis/rest/services/CTPopDot1970/MapServer"
    }),
    "1980": L.esri.tiledMapLayer({
      url: "http://tiles.arcgis.com/tiles/5rblLCKLgS4Td60j/arcgis/rest/services/CTPopDot1980/MapServer"
    }),
    "1990": L.esri.tiledMapLayer({
      url: "http://tiles.arcgis.com/tiles/5rblLCKLgS4Td60j/arcgis/rest/services/CTPopDot1990/MapServer"
    }),
    "2000": L.esri.tiledMapLayer({
      url: "http://tiles.arcgis.com/tiles/5rblLCKLgS4Td60j/arcgis/rest/services/CTPopDot2000/MapServer"
    }),
    "2010": L.esri.tiledMapLayer({
      url: "http://tiles.arcgis.com/tiles/5rblLCKLgS4Td60j/arcgis/rest/services/CTPopDot2010/MapServer"
    })  // no comma at the end of the list
  };

  // style the town geojson outlines
  function style(feature) {
    return {
        color: 'red', 
        weight: 0.5, 
        fillOpacity: 0
    };
  }

  var towns = L.geoJson(data, {
    style: style,
    // onEachFeature: onEachFeature // REMOVE THIS?
  }).addTo(map);
  towns.bindPopup(function (feature) {
    return L.Util.template('<p>{Town}</p>', feature.properties);
  });

  var overlays = {
    "CT towns": towns
  };
  L.control.layers(baseLayers, overlays, {collapsed: false}).addTo(map);  // collapsed false opens menu on startup

  // customize source link to your GitHub repo
       map.attributionControl
     .setPrefix('View <a href="http://github.com/jackdougherty/otl-historical-dot-density">open-source code on GitHub</a>, created with <a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>');

  }); // end of entire function
