$(function() {


    var descrip_data = [
        {"term": "Root", "description" : "The root of a phylogenetic tree represents a series of ancestors leading up to the most recent common ancestor of all the species represented in that tree. "},
        {"term": "Node", "description" : "A node is a branch point that represents a divergence event where a lineage splits into two different descendant groups."},
        {"term": "Sister Groups", "description" : "Sister groups are two monophyletic groups that are each other’s closest relatives."},
        {"term": "Terminal Node", "description" : "A terminal node is a node that appears as a branch tip on a phylogenetic tree"},
        {"term": "Character", "description" : "A character is a recognizable feature of an organism."}
    ]

    var state = 0;

	var width = 850, height = 450;

    var svg = d3.select("#visualization_2").append("svg")
        .attr("width", width)
        .attr("height", height);

    svg.append('g')
        .attr('transform', 'translate(50, 50)');

    var tree = d3.layout.tree()
        .size([270, 270]);

    d3.json('../data/vis2_data.json', function(json) {

    	var nodes = tree.nodes(json);
    	var links = tree.links(nodes);


        var node = svg.selectAll('.vis2_node')
            .data(nodes)
            .enter()
            .append('g')
                .attr('class', 'vis2_node')
                .attr('transform', function(d) { return 'translate(' + (d.x + 100)  + ',' + (d.y + 70) + ')';})
 			
 		node.append('circle')
            .attr('r', function(d) {return d.radius})
            .attr('fill', 'steelblue')
   
        node.append('text')
            .text(function(d) { return d.name;})
            .attr('x', -6)
            .attr('y', '25px')
            .style('font-weight', 'bold')
            .style('font-size', '1rem');

        var diagonal = d3.svg.diagonal()
            .projection(function(d) { return [d.x + 100, d.y + 60]; });

        svg.selectAll('.vis2_link')
            .data(links)
            .enter()
            .append('path')
            .attr('class', 'vis2_link')
            .attr('fill', 'none')
            .attr('stroke', 'black')
            .attr('d', diagonal);


        svg.append('circle')
            .attr('class', 'vis2_explanation')
            .attr('r', '15px')
            .attr('fill', 'grey')
            .style('opacity', 0.5)
            .attr('cx', '125px')
            .attr('cy', '130px')
            .on('click', function() {

                if (state == 0) {
                    state = 1;
                    $('#visualization_2 h4').text(descrip_data[1].term);
                    $('#visualization_2 p').text(descrip_data[1].description);
                    $('#node').css('opacity', 0.5);
                } else {
                    state = 0;
                    $('#visualization_2 h4').empty();
                    $('#visualization_2 p').empty()
                    $('#node').css('opacity', 0);
                }

            })

        svg.append('circle')
            .attr('class', 'vis2_explanation')
            .attr('r', '15px')
            .attr('fill', 'grey')
            .style('opacity', 0.5)
            .attr('cx', '370px')
            .attr('cy', '385px')
            .on('click', function() {
                if (state == 0) {
                    state = 1;
                    $('#visualization_2 h4').text(descrip_data[3].term);
                    $('#visualization_2 p').text(descrip_data[3].description);
                    $('#terminal').css('opacity', 0.5);
                } else {
                    state = 0;
                    $('#visualization_2 h4').empty();
                    $('#visualization_2 p').empty()
                    $('#terminal').css('opacity', 0);
                }
                
            })

        svg.append('circle')
            .attr('class', 'vis2_explanation')
            .attr('r', '15px')
            .attr('fill', 'grey')
            .style('opacity', 0.5)
            .attr('cx', '220px')
            .attr('cy', '405px')
            .on('click', function() {

                if (state == 0) {
                    state = 1;
                    $('#visualization_2 h4').text(descrip_data[2].term);
                    $('#visualization_2 p').text(descrip_data[2].description);
                    $('#sister').css('opacity', 0.5);
                } else {
                    state = 0;
                    $('#visualization_2 h4').empty();
                    $('#visualization_2 p').empty()
                    $('#sister').css('opacity', 0);
                }
            })

        svg.append('circle')
            .attr('class', 'vis2_explanation')
            .attr('r', '15px')
            .attr('fill', 'grey')
            .style('opacity', 0.5)
            .attr('cx', '195px')
            .attr('cy', '45px')
            .on('click', function() {
                if (state == 0) {
                    state = 1;
                    $('#visualization_2 h4').text(descrip_data[0].term);
                    $('#visualization_2 p').text(descrip_data[0].description);
                    $('#root').css('opacity', 0.5);
                } else {
                    state = 0;
                    $('#visualization_2 h4').empty();
                    $('#visualization_2 p').empty()
                    $('#root').css('opacity', 0);
                }

            })

        svg.append('circle')
            .attr('class', 'vis2_explanation')
            .attr('r', '15px')
            .attr('fill', 'grey')
            .style('opacity', 0.5)
            .attr('cx', '280')
            .attr('cy', '225px')
            .on('click', function() {
                if (state == 0) {
                    state = 1;
                    $('#visualization_2 h4').text(descrip_data[4].term);
                    $('#visualization_2 p').text(descrip_data[4].description);
                    $('.chara_2').css('opacity', 0.5);
                } else {
                    state = 0;
                    $('#visualization_2 h4').empty();
                    $('#visualization_2 p').empty()
                    $('.chara_2').css('opacity', 0);
                }
            })    

        // var c = $('div').attr('class', 'bob'); 
        // console.log(c);

        createCharacters('chara', 310, 180);

        createCharacters('chara', 297, 290);



        createCharacters('chara_2', 291, 277);
        createCharacters('chara_2', 305, 166);
        // test.css({'position': 'aboslute', 'width': '10px', 'border': 'solid 1px black', 'height': '50px'})
        // svg.append(test);

 	 })
    
    function createCharacters(name, x, y) {
        var t = $('<div class="' + name + '"></div>');
        t.css('left', x + 'px');
        t.css('top', y + 'px');
        $('#visualization_2').append(t);



    }




















})