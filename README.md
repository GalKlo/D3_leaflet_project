# leaflet-challenge

The map visualizes earthquake data based on the last week summary provided by United States Geological Survey (https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson).


Map was created using D3 and Leaflet libraries. 

Data markers are plotted based on the longitude and latitude of all the earthquakes incidents. And reflect the following:
- magnitude of the earthquake by its size (the higher the magnitude the larger the marker);
- depth of the earthquake by color (the greater the depth the darkerthe colour). 

When the associated marker is clicked, popups provide additional information about the earthquake, such as: 
- location,
- date, 
- magnitude, 
- depth.

The legend provides context for colour of a marker and the corresponding depth range.
