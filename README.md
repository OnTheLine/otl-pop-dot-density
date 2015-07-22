# otl-historical-dot-density
historical population dot density maps for On The Line book

## Demos
1) using ArcGIS online and Esri-Leaflet TileLayer
http://jackdougherty.github.io/otl-historical-dot-density/index.html

2) animated GIF, created with ArcMap around 2005 (but user cannot stop play or zoom in; no overlays)
http://jackdougherty.github.io/otl-historical-dot-density/1900-2000-animated.gif

## Steps to create TileLayer with ArcGIS online and Esri-leaflet

Based on documentation: Publish Tiles on ArcGIS Online https://doc.arcgis.com/en/arcgis-online/share-maps/publish-tiles.htm#GUID-C467C9D7-443D-48D6-90AB-8204E3B9FD83

Requires:
- ArcMap (I used v 10.2.2)
- ArcGIS Online organizational account access (I used http://trincoll.maps.arcgis.com/home/content.html)

Prepare historical population data (I used CT towns, 1900-2010, saved in XLS format, column headers cannot begin with numbers)

Download shapefile to match population data (I used CT town boundaries, 2010 census, WGS84 projection, downloaded from UConn MAGIC). Note that sourceinfo mentions two towns that do not perfectly match this boundary: West Haven not established until 1921, and Deep River has no data in this file until 1970

Follow documentation part 3: Build and publish a tile package, which seems to offer most control over size of tiles created. The goal is to create tile layers that are sufficiently detailed for your project, but with a small file size to allow rapid loading in your interactive map. (For the workflow below, each decade-level tile layer is about 2mb.)

Create map in ArcMap to join shapefile with population data table
- join town-level census data to statewide town shapefile
- layer > export > save data > create new shapefile to preserve the joined data
- properties > symbology > features: set town polygon to hollow
- properties > symbology > quantities > dot density: set up to generate each tile service the same way:
  - dot = black circle
  - dot size = 2
  - dot value = 1000
  - background line icon = no color (to remove town boundaries from tiles)
  - background fill icon = white (for solid statewide background when displayed on map)

![screenshot](ArcMap-CTPopDotDensityMap.jpg)

Upload to ArcGIS Online
- file > log into ArcGIS online subscription account (in my case, http://trincoll.maps.arcgis.com)
- customize > arcmap options > sharing and select Enable ArcGIS Runtime tools
- file > share as > tile package, with these settings:
  - tile package > upload to my account (insert file name)
  - tile format: ArcGIS Online/Bing/Google, PNG, up to zoom level 11 (metro areas) since dots are randomly placed in each town
  - item description and tags (required)
  - sharing: everyone
- do this for each map layer (in my case, each decade of historical data)

In web browser, go to My Content for your ArcGIS Online site (mine is http://trincoll.maps.arcgis.com/home/content.html)
- individually click on each Tile Package that has been uploaded to open browser settings
- select Publish (ArcGIS Online will start "Publishing Tiles. . ."
- select Share > Everyone
- ArcGIS Online will create tiles with a URL similar to mine (http://tiles.arcgis.com/tiles/5rblLCKLgS4Td60j/arcgis/rest/services/CTPopDot1900/MapServer)
- WAIT ON THIS in My Content browser window, keep new "Tile Layer," but option to erase "Tile Package" to reduce storage charges for ArcGis Online

In Leaflet (with Esri-Leaflet plugin), code each tile layer to display as desired, based on this L.esriTiledMapLayer example
- http://esri.github.io/esri-leaflet/examples/tile-layer-1.html

### To Do
- currently using simple L.control.layers; need to work on a slider tool (see https://jqueryui.com/slider/#steps)
- play button to cycle through layers? (https://www.mapbox.com/mapbox.js/example/v1.0.0/cycle-overlays/)
- ask others for ideas about how to reduce the tile size, or optimize the workflow (since I could not figure out how to do this from one map tile with multiple layers)
- on My Content > Tile layer, see Manage Tiles (and figure out if there's a way to optimize this; do not delete Tile Packages)

### Content for copy and paste step above
Item description summary, tags, access, credits to copy and paste each time:
- Connecticut town population dot density map, 1900-2010, based on US Census data reported by CT Secretary of State, for On The Line (http://OnTheLine.trincoll.edu)
- Connecticut
- CC-BY (freely available if attribution included)
- Jack Dougherty, Trinity College
