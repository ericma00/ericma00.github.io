$(function() {

  var w = 850,
    h = 450,
    i = 0,
    duration = 700,
    root;

var tree = d3.layout.tree()
    .size([350, 350]);

var species_1 = $('#sp_3_1');
var species_2 = $('#sp_3_2');

var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

var vis = d3.select("#chart").append("svg:svg")
    .attr("width", w)
    .attr("height", h)
    .append("svg:g")
        .attr("transform", "translate(30,50)");
        vis.append("text")
            .attr("x", (w / 2))             
            .attr("y", (h/10))

d3.json("./data/math_map_compact.json", function(json) {
  json.x0 = 800;
  json.y0 = 0;
  console.log(json);
  update(root = json);
});

function update(source) {
  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse();
  //var links = tree.links(nodes);

  // Update the nodes…
    var node = vis.selectAll(".vis3_node")
      .data(nodes, function(d) { return d.id || (d.id = ++i); });

  var nodeEnter = node.enter().append("svg:g")
      .attr("class", "vis3_node")
        .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; });
        
  // Enter any new nodes at the parent's previous position. 
    nodeEnter.append("svg:circle")
    //   .attr("r", 4.5)
    //   .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; })
      .attr('r', function(d) {return d.radius})
      .attr('fill', 'steelblue')
      .on("click", function(d) {      
            if ($('#sp_3_2 h4').text().length > 0){
                                $("#sp_3_2").text("");  }})
      .on("click", function(d) {      
                    $('#sp_3_2 h4').text(d.answer);
                    $('#sp_3_2 p').text(d.explain);                          
                })
  
  nodeEnter.append("svg:text")
        .attr("x", function(d) { return d._children ? -8 : 8; })
    .attr("y", 3)
        .text(function(d) { return d.name; });

    // Transition nodes to their new position.
  nodeEnter.transition()
    .duration(duration)
    .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
        .style("opacity", 1)
      .select("circle")
        .style("fill", "lightsteelblue");
      
  // Update the links…
  var link = vis.selectAll("path.link")
      .data(tree.links(nodes), function(d) { return d.target.id; });

        //   // Enter any new links at the parent's previous position.
        link.enter().insert("svg:path", "g")
            .attr("class", "link")
            .attr("d", function(d) {
                var o = {x: source.x0, y: source.y0};
                return diagonal({source: o, target: o});
            })
            .transition()
            .duration(duration)
            .attr("d", diagonal);

        // Transition links to their new position.
        link.transition()
            .duration(duration)
            .attr("d", diagonal);

        // Transition exiting nodes to the parent's new position.
        link.exit().transition()
            .duration(duration)
            .attr("d", function(d) {
                var o = {x: source.x, y: source.y};
                return diagonal({source: o, target: o});
            })
            .remove();
}






})

