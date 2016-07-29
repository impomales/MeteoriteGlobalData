$(document).ready(function() {
  var width = '100%';
  var height = 650;
  var worldURL = 'https://raw.githubusercontent.com/mbostock/topojson/master/examples/world-110m.json';
  var meteoriteJSON = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json';
  
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
    
    d3.json(meteoriteJSON, function(error, data) {
      // need to add circle to map using coordinates.
      var maxMass = d3.max(data.features.map(function(d) {return parseInt(d.properties.mass);}));
      
      g.selectAll("circle")
        .data(data.features)
        .enter().append('circle')
        .attr('class', 'circle')
        .attr('fill-opacity', 0.5)
        .attr('cx', function(d) {
          return  projection([d.properties.reclong, d.properties.reclat])[0];})
        .attr('cy', function(d) {
          return projection([d.properties.reclong, d.properties.reclat])[1];})
        .attr('r', function(d) {return 5;});
    }); 
  });
});