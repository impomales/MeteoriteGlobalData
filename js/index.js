$(document).ready(function() {
  var width = '100%';
  var height = 650;
  var worldURL = 'https://raw.githubusercontent.com/mbostock/topojson/master/examples/world-110m.json';
  
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
  });
});