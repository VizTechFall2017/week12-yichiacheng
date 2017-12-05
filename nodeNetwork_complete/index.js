var width = document.getElementById('svg1').clientWidth;
var height = document.getElementById('svg1').clientHeight;

var marginLeft = 0;
var marginTop = 0;

var svg = d3.select('svg')
    .append('g')
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')');

var color = d3.scaleOrdinal(d3.schemeCategory20);//d3提供的預設顏色，隨便20種

var simulation = d3.forceSimulation() //告訴simulation線和點在哪？
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

//import the data from the .csv file
d3.json('./lesmis.json', function(graph){

    var link = svg.append("g")//畫連接點點的線
        .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter()
        .append("line")
        .attr('stroke','gainsboro')
        .attr("stroke-width", function(d) { return Math.sqrt(d.value); });

    var node = svg.append("g")//畫圓點點
        .attr("class", "nodes")
        .selectAll("circle")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("r", 5)
        .attr("fill", function(d) { return color(d.group); })
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    node.append("title")//給點點名字
        .text(function(d) { return d.id; });

    simulation
        .nodes(graph.nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(graph.links);

    function ticked() {
        link//幫連接點點的線建立刻度
            .attr("x1", function(d) { return d.source.x; })//generate x,y axis value for you
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node//畫圓點點的刻度
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
    }

});


function dragstarted(d) {//開始拉
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;//x位移的量
    d.fy = d.y;//y位移的量
}

function dragged(d) {//被拉中
    d.fx = d3.event.x;//
    d.fy = d3.event.y;
}

function dragended(d) {//拉完了
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;//改成預設
    d.fy = null;//改成預設
}


