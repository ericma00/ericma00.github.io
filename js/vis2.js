$(function() {


    var descrip_data = [
        {"term": "Root", "id": "root", "description" : "The root of a phylogenetic tree represents a series of ancestors leading up to the most recent common ancestor of all the species represented in that tree. "},
        {"term": "Node", "id": "node", "description" : "A node is a branch point that represents a divergence event where a lineage splits into two different descendant groups."},
        {"term": "Sister Groups", "id":"sister", "description" : "Sister groups are two monophyletic groups that are each other’s closest relatives."},
        {"term": "Terminal Node","id":"terminal", "description" : "A terminal node is a node that appears as a branch tip on a phylogenetic tree"},
        {"term": "Character", "id": "chara_2","description" : "A character is a recognizable feature of an organism."}
    ]

    var descript = "";

    var state = 0;

	var width = 850, height = 450;


    var selectColor = "#386b97";
    var selectOpacity = 1;

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
            .attr('fill', 'grey')
   
        node.append('text')
            .text(function(d) { return d.name;})
            .attr('x', -6)
            .attr('y', '25px')
            .style('font-weight', 'bold')
            .style('font-size', '1rem');

        var diagonal = d3.svg.diagonal()
            .projection(function(d) { return [d.x + 100, d.y + 65]; });

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
            .attr('fill', selectColor)
            .style('opacity', selectOpacity)
            .attr('cx', '125px')
            .attr('cy', '130px')
            .on('click', function() {

                display_description(1, 'node');

            })



        svg.append('circle')
            .attr('class', 'vis2_explanation')
            .attr('r', '15px')
            .attr('fill', selectColor)
            .style('opacity', selectOpacity)
            .attr('cx', '370px')
            .attr('cy', '385px')
            .on('click', function() {
                display_description(3, 'terminal');
                
            })

        svg.append('circle')
            .attr('class', 'vis2_explanation')
            .attr('r', '15px')
            .attr('fill', selectColor)
            .style('opacity', selectOpacity)
            .attr('cx', '220px')
            .attr('cy', '405px')
            .on('click', function() {

                display_description(2, 'sister');
            })

        svg.append('circle')
            .attr('class', 'vis2_explanation')
            .attr('r', '15px')
            .attr('fill', selectColor)
            .style('opacity', selectOpacity)
            .attr('cx', '195px')
            .attr('cy', '45px')
            .on('click', function() {
                display_description(0, 'root');

            })

        svg.append('circle')
            .attr('class', 'vis2_explanation')
            .attr('r', '15px')
            .attr('fill', selectColor)
            .style('opacity', selectOpacity)
            .attr('cx', '280')
            .attr('cy', '225px')
            .on('click', function() {
                display_description(4, 'character');
            })    

        createCharacters('chara', 310, 180);
        createCharacters('chara', 297, 290);

        createQ(188, 26);
        createQ(118, 111);
        createQ(273.5, 206);
        createQ(213.5, 386);
        createQ(363.5, 366);


        createTimeline(65, 80, 65, 350);
        
      //   <line x1="20" y1="100" x2="100" y2="20"
      // stroke-width="2" stroke="black"/>

 	 })
    
    function clear_everything() {
        $('#visualization_2 h4').empty();
        $('#visualization_2 p').empty();
        
        $('.character').css('opacity', 0);
        $('#root').css('opacity', 0);
        $('#sister').css('opacity', 0);
        $('#terminal').css('opacity', 0);
        $('#node').css('opacity', 0);  
    }


    function display_description(num, name) {
        console.log("name: " + name);
        if (state == 0) {
            state = 1;

            d3.select('#vis2_description')
                .transition()
                .duration(500)
                .style('opacity', 1);

            $('#visualization_2 h4').text(descrip_data[num].term);
            $('#visualization_2 p').text(descrip_data[num].description);


            if (name == "character") {
                $('.character').css('opacity', 0.3);
            } else {
                d3.select('#' + name)
                    .transition()
                    .duration(500)
                    .style('opacity', 0.35);
            }

            descript = name;
        } else {
            if (descript == name) {
                state = 0;

                d3.select('#vis2_description')
                    .transition()
                    .duration(500)
                    .style('opacity', 0);

                setTimeout(function() {
                    $('#visualization_2 h4').empty();
                    $('#visualization_2 p').empty();                    
                }, 500);


                if (name == "character") {

                    $('.character').css('opacity', 0);
                } else {
                    d3.select('#' + name)
                        .transition()
                        .duration(500)
                        .style('opacity', 0);
                }
                descript = "";
            } else {
                clear_everything();

                d3.select('#vis2_description')
                    .style('opacity', 0)
                    .transition()
                    .duration(700)
                    .style('opacity', 1);

                $('#visualization_2 h4').text(descrip_data[num].term);
                $('#visualization_2 p').text(descrip_data[num].description);
                if (name == "character") {
                    $('.character').css('opacity', 0.3);
                } else {
                   $('#' + name).css('opacity', 0.3); 
               }
                descript = name;
            }
        }

    }

    function createTimeline(x1, y1, x2, y2) {
        svg.append('line')
            .style('stroke', '#808080')
            .style('stroke-width', 2)
            .attr('x1', x1)
            .attr('y1', y1)
            .attr('x2', x2)
            .attr('y2', y2);

        svg.append('line')
            .style('stroke', '#808080')
            .style('stroke-width', 2)
            .attr('x1', 58)
            .attr('y1', 340)
            .attr('x2', 65)
            .attr('y2', 350);

        svg.append('line')
            .style('stroke', '#808080')
            .style('stroke-width', 2)
            .attr('x1', 72)
            .attr('y1', 340)
            .attr('x2', 65)
            .attr('y2', 350);


        svg.append('text')
            .text('ANCESTORS')
            .attr('x', 22)
            .attr('y', 67)
            .style('fill', '#808080')
            .style('font-size', '11pt')
            .style('font-weight', 'bold');

        svg.append('text')
            .text('PRESENT-DAY')
            .attr('x', 17)
            .attr('y', 375)
            .style('font-size', '11pt')
            .style('fill', '#808080')
            .style('font-weight', 'bold');

        svg.append('text')
            .text('SPECIES')
            .attr('x', 37)
            .attr('y', 390)
            .style('fill', '#808080')
            .style('font-size', '11pt')
            .style('font-weight', 'bold');


    }

    function createCharacters(name, x, y) {
        var t = $('<div class="' + name + '"></div>');
        t.css('left', x + 'px');
        t.css('top', y + 'px');
        $('#visualization_2').append(t);



    }



    function createQ(x, y) {
        var q = $('<span class="question">?</span>');
        q.css('font-size', '12px');
        q.css('left', (x + 4) + 'px');
        q.css('top', (y+ 10) + 'px');   
        $('#visualization_2').append(q);
    }
















})