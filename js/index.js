$(document).ready(function() {
  var width = '100%';
  var height = 650;
  var worldURL = 'https://raw.githubusercontent.com/mbostock/topojson/master/examples/world-110m.json';
  var meteoriteJSON = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json';
  var nasaJSON = 'https://data.nasa.gov/resource/y77d-th95.geojson';
  
  var projection = d3.geo.mercator();
  
  var svg = d3.select("#container").append("svg")
    .attr("width", width)
    .attr("height", height);
  
  var path = d3.geo.path()
    .projection(projection);
  
  var g = svg.append("g");
  
  d3.json(worldURL, function(error, topology) {
    g.selectAll("path")
      .data(topojson.feature(topology, topology.objects.countries)
          .features)
      .enter().append("path")
        .attr('d', path);
    
    d3.json(nasaJSON, function(error, data) {
      var max = d3.max(data.features.map(function(d) {return parseFloat(d.properties.mass);}));
      console.log(max);
      g.selectAll("circle")
        .data(data.features)
        .enter().append('circle')
        .attr('class', 'circle')
        .attr('fill-opacity', 0.5)
        .attr('cx', function(d) {
          return  projection([d.properties.reclong, d.properties.reclat])[0];})
        .attr('cy', function(d) {
          return projection([d.properties.reclong, d.properties.reclat])[1];})
        .attr('r', function(d) {
          var mass = parseFloat(d.properties.mass);
          if (mass < 100000) return 2;
          if (mass < 200000) return 5;
          if (mass < 300000) return 10;
          if (mass < 2000000) return 15;
          if (mass < 10000000) return 20;
          return 25;
        });
    }); 
  });
});