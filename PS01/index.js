var svg = d3.select("#svg1"),

    margin = {top: 10, right: 20, bottom: 80, left: 100},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);

var tooltip = d3.select("body").append("div").attr("class", "toolTip");

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var nestedData = [];


var marginLeft = 100;
var marginTop = 80;

var svg2 = d3.select('#svg2')
    .append('g')
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')');



//set up the projection for the map
var albersProjection = d3.geoAlbers()  //tell it which projection to use
    .scale(130000)//tell it how big the map should be
    .rotate([71.057, 0])
    .center([0, 42.313])
    .translate([(width/2), (height/2)]);


var densityLookup = d3.map();
var crimerateLookup = d3.map();
var tstationLookup = d3.map();
var descriptionLookup = d3.map();
//var dotLookup= d3.map();


path = d3.geoPath()
    .projection(albersProjection);        //tell it to use the projection that we just made to convert lat/long to pixels


d3.queue()
    .defer(d3.json, "./Boston_Neighborhoods.json")
    .defer(d3.csv, "./neighborhoodsdata.csv")
    .defer(d3.csv,"./brent20171615.csv")
    .await(function(err, mapData, districtData,dataIn){

//console.log(districtData);

//d3.csv("./brent20171615.csv", function(dataIn) {
    nestedData = d3.nest()
        .key(function(d){return d.year})
        .entries(dataIn);
    //console.log(nestedData);

    var loadData = nestedData.filter(function(d){return d.key == '2017'})[0].values;

    x.domain(loadData.map(function(d) { return d.neighborhood; }));
    y.domain([0, d3.max(loadData, function(d) { return d.rent; })]);


    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", function(d) {
            return "rotate(-45)"
        });


    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("rent");

    g.selectAll(".bar")
        .data(loadData)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.neighborhood); })
        .attr("y", function(d) { return y(d.rent); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.rent); })
        .on("mouseover", function(d){
            tooltip
                .style("left", d3.event.pageX - 50 + "px")
                .style("top", d3.event.pageY - 70 + "px")
                .style("display", "inline-block")
                .html((d.neighborhood) + "<br>" + "$" + (d.rent));
        })
        .on("mouseout", function(d){ tooltip.style("display", "none");});



       // console.log(districtData);
        districtData.forEach(function(d){
            densityLookup.set(d.neighborhoods, d.density);
            crimerateLookup.set(d.neighborhoods, d.crimerate);
            tstationLookup.set(d.neighborhoods, d.tstation);
            descriptionLookup.set(d.neighborhoods, d.description);
        });
        // set: what this library's entry should be
       // console.log(densityLookup);
        //console.log(crimerateLookup);
       // console.log(tstationLookup);
        //console.log(descriptionLookup);



//import the data from the .csv file
//d3.json('./Boston_Neighborhoods.json', function(dataIn){

        svg2.selectAll("path")               //make empty selection
            .data(mapData.features)          //bind to the features array in the map data
            .enter()
            .append("path")                 //add the paths to the DOM
            .attr("d", path)                //actually draw them
            .attr("class", "feature")
            .attr('fill','slategray')
            .attr('stroke','white')
            .attr('stroke-width',.2)


            .on('mouseover',function(d){
              //  console.log(d.properties.Name);
                document.getElementById('title').innerHTML = d.properties.Name;
                document.getElementById('crimerate').innerHTML = (crimerateLookup.get(d.properties.Name));
                document.getElementById('density').innerHTML = (densityLookup.get(d.properties.Name));
                document.getElementById('tstation').innerHTML = (tstationLookup.get(d.properties.Name));
                document.getElementById('description').innerHTML = (descriptionLookup.get(d.properties.Name));


                d3.select(this)
                    .attr('fill', 'LightSteelBlue');
                })
                    .on('mouseout', function(d) {
                        d3.select(this)
                            .attr('fill', 'slategray')

                    });


                Arraylist1=[
                    {long:-71.0622954369, lat:42.3561971861},
                    {long:-71.0648703575, lat:42.3523914894},
                    {long:-71.070498, lat:42.351868},
                    {long:-71.078089, lat:42.349962},
                    {long:-71.088396, lat:42.348097},
                    {long:-71.0815858841, lat:42.3456358101},
                    {long:-71.085095, lat:42.342697},
                    {long:-71.0888922215, lat:42.3403227355},
                    {long:-71.0954797268, lat:42.3377215443},
                    {long:-71.100652, lat:42.3377215443},
                    {long:-71.059895, lat:42.359297},
                    {long:-71.058996, lat:42.362498},
                    {long:-71.061423, lat:42.365512},
                    {long:-71.0681641102, lat:42.3666775177},
                    //{long:-71.076884, lat:42.370582},
                    {long:-71.095296, lat:42.348797},
                    {long:-71.1043953896, lat:42.3452869056},
                    {long:-71.100796, lat:42.349297},
                    {long:-71.103825, lat:42.349648},
                    {long:-71.1043953896, lat:42.3499335211},

                    {long:-71.1140727997, lat:42.350900862},
                    {long:-71.1159074306, lat:42.3511308015},
                    {long:-71.1182141304, lat:42.3513448824},
                    {long:-71.1212611198, lat:42.3517413265},
                    {long:-71.1248660088, lat:42.3520743376},
                    {long:-71.1310243607, lat:42.3502348256},
                    {long:-71.1341571808, lat:42.3487124302},
                    {long:-71.1377835274, lat:42.3484428354},
                    {long:-71.1043953896, lat:42.3484745525},
                    {long:-71.1428689957, lat:42.3436850916},
                    {long:-71.1043953896, lat:42.3414964086},
                    {long:-71.1513018608, lat:42.3403385961},
                    {long:-71.1577820778, lat:42.3395772832},
                    {long:-71.1661934853, lat:42.3399420801},
                    {long:-71.1533403397, lat:42.338086352}];

                    Arraylist2=[
//orange
                    {long:-71.060788, lat:42.355295},
                    {long:-71.062892, lat:42.352228},
                    {long:-71.063795, lat:42.349873},
                    {long:-71.0760390759, lat:42.3472772215},
                    {long:-71.0832166672, lat:42.3415519196},
                    {long:-71.0905230045, lat:42.3356674788},
                    {long:-71.0954046249, lat:42.3315274209},
                    {long:-71.1000823975, lat:42.3227388088},
                    {long:-71.1028289795, lat:42.3192008078},
                    {long:-71.107313633, lat:42.3105691548},
                    {long:-71.113411, lat:42.300362}];

                    Arraylist3=[
//red
                    {long:-71.0549998283, lat:42.351709611},
                    {long:-71.05713, lat:42.3429},
                    {long:-71.05696, lat:42.32955},
                    {long:-71.0523927212, lat:42.3214378629},
                    {long:-71.0532295704, lat:42.311307017},
                    {long:-71.0607075691, lat:42.3002619819},
                    {long:-71.0657823086, lat:42.2927943769},
                    {long:-71.064219, lat:42.285924},
                    {long:-71.0597419739, lat:42.278420118},
                    {long:-71.0720801353, lat:42.3612710899}];

                    Arraylist4=[
//blue
                    {long:-71.062129, lat: 42.361457},
                    {long:-71.05357, lat:42.359456},
                    {long:-71.039926, lat:42.36886},
                    {long:-71.035194397, lat:42.3727334327},
                    {long:-71.023394, lat:42.380797},
                    {long:-71.006628, lat:42.386676},
                    {long:-71.0003578663, lat:42.3884015915}




                ];
                svg2.selectAll('circle1')
                    .data(Arraylist1)       //bind a single data point, with the long lat of Boston
                    //note that long is negative because it is a W long point!
                    .enter()
                    .append('circle')
                    .attr('cx', function (d){
                        return albersProjection([d.long, d.lat])[0]
                    })
                    .attr('cy', function (d){
                        return albersProjection([d.long, d.lat])[1]
                    })
                    .attr('r', 3)
                    .attr('fill','black')
                    .on('mouseover', function(d){


                        d3.select(this).attr("class","incident hover");
                        d3.select(this).attr("fill","forestgreen");
                        d3.select(this).attr("r","5");


                    })
                    .on("mouseout", function(d){
                        d3.select(this)
                            .attr("fill",'black');
                        d3.select(this).attr("r","3");})


                svg2.selectAll('circle2')
                    .data(Arraylist2)       //bind a single data point, with the long lat of Boston
                    //note that long is negative because it is a W long point!
                    .enter()
                    .append('circle')
                    .attr('cx', function (d){
                        return albersProjection([d.long, d.lat])[0]
                    })
                    .attr('cy', function (d){
                        return albersProjection([d.long, d.lat])[1]
                    })
                    .attr('r', 3)
                    .attr('fill','black')
                    .on('mouseover', function(d){


                        d3.select(this).attr("class","incident hover");
                        d3.select(this).attr("fill","darkorange");
                        d3.select(this).attr("r","5");


                    })
                    .on("mouseout", function(d){
                        d3.select(this).attr("fill",'black');
                        d3.select(this).attr("r","3")})





                svg2.selectAll('circle3')
                    .data(Arraylist3)       //bind a single data point, with the long lat of Boston
                    //note that long is negative because it is a W long point!
                    .enter()
                    .append('circle')
                    .attr('cx', function (d){
                        return albersProjection([d.long, d.lat])[0]
                    })
                    .attr('cy', function (d){
                        return albersProjection([d.long, d.lat])[1]
                    })
                    .attr('r', 3)
                    .attr('fill','black')
                    .on('mouseover', function(d){


                        d3.select(this).attr("class","incident hover");
                        d3.select(this).attr("fill","red");
                        d3.select(this).attr("r","5");


                    })
                    .on("mouseout", function(d){
                        d3.select(this).attr("fill",'black');
                        d3.select(this).attr("r","3")})


                svg2.selectAll('circle4')
                    .data(Arraylist4)       //bind a single data point, with the long lat of Boston
                    //note that long is negative because it is a W long point!
                    .enter()
                    .append('circle')
                    .attr('cx', function (d){
                        return albersProjection([d.long, d.lat])[0]
                    })
                    .attr('cy', function (d){
                        return albersProjection([d.long, d.lat])[1]
                    })
                    .attr('r', 3)
                    .attr('fill','black')
                    .on('mouseover', function(d){


                        d3.select(this).attr("class","incident hover");
                        d3.select(this).attr("fill","royalBlue");
                        d3.select(this).attr("r","5");


                    })
                    .on("mouseout", function(d){
                        d3.select(this).attr("fill",'black');
                        d3.select(this).attr("r","3")})




            });
               /* svg2.selectAll('circle')
                    .data(dotData.features);
                    console.log(dotData)
                    .enter()
                    .append('circle')
                   // .attr('id', function(d){return d.station;})
                    .attr('cx', function (d){
                        return albersProjection([d.longtitude, d.latitude])[0]
                    })
                    .attr('cy', function (d){
                        return albersProjection([d.longtitude, d.latitude])[1]
                    })
                    .attr('r', 3)
                    .attr('fill','navvy');
            });*/
   // });




function drawPoints(pointData){console.log(pointData);

    x.domain(pointData.map(function(d) { return d.neighborhood; }));
    y.domain([0, d3.max(pointData, function(d) { return d.rent; })]);

    d3.selectAll('.axis axis--x')
        .call(d3.axisBottom(x));

    d3.selectAll('.axis axis--y')
        .call(d3.axisLeft(y));


    var rects = svg.selectAll('.bar')
    //.data(pointData, function(d){return d.neigborhood;});
        .data(pointData);


    rects.exit()
        .remove();


    rects
        .transition()
        .duration(200)
        .attr('x',function(d){
            return x(d.neighborhood);
        })
        .attr('y',function(d){
            return y(d.rent);
        })
        .attr('width',function(d){
            return x.bandwidth();
        })
        .attr('height',function(d){
            return height - y(d.rent);
        });


    /*rects
        .enter()
        .append('rect')
        .attr('class','bar')
        .attr('x',function(d){
            return x(d.neighborhood);
        })
        .attr('y',function(d){
            return y(d.rent);
        })
        .attr('width',function(d){
            return x.bandwidth();
        })
        .attr('height',function(d){
            return height - y(d.rent);
        });*/


}


function updateData(selectedYear){
    //console.log(selectedYear);
    var loadData = nestedData.filter(function(d){return d.key == selectedYear})[0].values;
    //console.log(loadData);
    drawPoints(loadData)
}

function change(value){
    //console.log(value)

    if(value =='2017'){
        updateData('2017');

    }else if(value == '2015'){
        updateData('2015');
    }
    else {
        updateData('2016');
    }
    //newData = updateData(value);
    //drawPoints(newData);
    //console.log(newData)
}


//var width = document.getElementById('svg2').clientWidth;
//var height = document.getElementById('svg2').clientHeight;


//set up the projection for the map
/*var albersProjection = d3.geoAlbers()  //tell it which projection to use
    .scale(190000)//tell it how big the map should be
    .rotate([71.057, 0])
    .center([0, 42.313])
    .translate([(width/2), (height/2)]);  //set the center of the map to show up in the center of the screen
//set up the path generator function to draw the map outlines
path = d3.geoPath()
    .projection(albersProjection);        //tell it to use the projection that we just made to convert lat/long to pixels
var div = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0.8);
var colorScale = d3.scaleLinear().range(['white','Gainsboro']);
var districtLookup = d3.map(); //check library(lookup table) to get information>connection name and value
//var colorScale = d3.scaleLinear()
//  .domain([10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000])
//.range(['#ffffe0','#ffdfa9','#ffbd84','#ff976d','#f47461','#e25056','#cb2f44','#ae112a','#8b0000']);
queue()
    .defer(d3.json, "./Boston_Neighborhoods.json")
    .defer(d3.csv, "./neighborhoodsdata.csv")
    .await(function(err, mapData, densityData){
        densityData.forEach(function(d){
            districtLookup.set(d.name, d.density);//set: what this library's entry should be
        });
        colorScale.domain([0, d3.max(densityData.map(function(d){return +d.density}))]);//set color scale to match pop data and reflect on map
        svg2.selectAll("path")               //make empty selection
            .data(mapData.features)          //bind to the features array in the map data
            .enter()
            .append("path")                 //add the paths to the DOM
            .attr("d", path)                //actually draw them
            .attr("class", "feature")
            .attr('fill',function(d){
                return colorScale(districtLookup.get(d.properties.NAME));//fill in the color in scale according the properties of each state data
            })
            .attr('stroke','white')
            .attr('stroke-width',1)
            .on("mouseover", function(d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.text(d.properties.Name)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            // fade out tooltip on mouse out
            .on("mouseout", function(d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
        Arraylist1=[
            {long:-71.0622954369, lat:42.3561971861, Name: "ParkStreet"},
            {long:-71.0648703575, lat:42.3523914894},
            {long:-71.070498, lat:42.351868},
            {long:-71.078089, lat:42.349962},
            {long:-71.088396, lat:42.348097},
            {long:-71.0815858841, lat:42.3456358101},
            {long:-71.085095, lat:42.342697},
            {long:-71.0888922215, lat:42.3403227355},
            {long:-71.0954797268, lat:42.3377215443},
            {long:-71.100652, lat:42.3377215443},
            {long:-71.059895, lat:42.359297},
            {long:-71.058996, lat:42.362498},
            {long:-71.061423, lat:42.365512},
            {long:-71.0681641102, lat:42.3666775177},
            //{long:-71.076884, lat:42.370582},
            {long:-71.095296, lat:42.348797},
            {long:-71.1043953896, lat:42.3452869056},
            {long:-71.100796, lat:42.349297},
            {long:-71.103825, lat:42.349648},
            {long:-71.1043953896, lat:42.3499335211},
            {long:-71.1140727997, lat:42.350900862},
            {long:-71.1159074306, lat:42.3511308015},
            {long:-71.1182141304, lat:42.3513448824},
            {long:-71.1212611198, lat:42.3517413265},
            {long:-71.1248660088, lat:42.3520743376},
            {long:-71.1310243607, lat:42.3502348256},
            {long:-71.1341571808, lat:42.3487124302},
            {long:-71.1377835274, lat:42.3484428354},
            {long:-71.1043953896, lat:42.3484745525},
            {long:-71.1428689957, lat:42.3436850916},
            {long:-71.1043953896, lat:42.3414964086},
            {long:-71.1513018608, lat:42.3403385961},
            {long:-71.1577820778, lat:42.3395772832},
            {long:-71.1661934853, lat:42.3399420801},
            {long:-71.1533403397, lat:42.338086352},
            {long:-71.060788, lat:42.355295},
            {long:-71.062892, lat:42.352228},
            {long:-71.063795, lat:42.349873},
            {long:-71.0760390759, lat:42.3472772215},
            {long:-71.0832166672, lat:42.3415519196},
            {long:-71.0905230045, lat:42.3356674788},
            {long:-71.0954046249, lat:42.3315274209},
            {long:-71.1000823975, lat:42.3227388088},
            {long:-71.1028289795, lat:42.3192008078},
            {long:-71.107313633, lat:42.3105691548},
            {long:-71.113411, lat:42.300362},
            {long:-71.0549998283, lat:42.351709611},
            {long:-71.05713, lat:42.3429},
            {long:-71.05696, lat:42.32955},
            {long:-71.0523927212, lat:42.3214378629},
            {long:-71.0532295704, lat:42.311307017},
            {long:-71.0607075691, lat:42.3002619819},
            {long:-71.0657823086, lat:42.2927943769},
            {long:-71.064219, lat:42.285924},
            {long:-71.0597419739, lat:42.278420118},
            {long:-71.0720801353, lat:42.3612710899},
            //{long:-71.0760390759, lat:42.351709611},
            {long:-71.062129, lat: 42.361457},
            {long:-71.05357, lat:42.359456},
            {long:-71.039926, lat:42.36886},
            {long:-71.035194397, lat:42.3727334327},
            {long:-71.023394, lat:42.380797},
            {long:-71.006628, lat:42.386676},
            {long:-71.0003578663, lat:42.3884015915}
        ];
        svg2.selectAll('circle')
            .data(Arraylist1)       //bind a single data point, with the long lat of Boston
            //note that long is negative because it is a W long point!
            .enter()
            .append('circle')
            .attr('cx', function (d){
                return albersProjection([d.long, d.lat])[0]
            })
            .attr('cy', function (d){
                return albersProjection([d.long, d.lat])[1]
            })
            .attr('r', 3)
            .attr('fill','black')
            .on('mouseover', function(d){
                d3.select("h2").text(d.Name );
                d3.select(this).attr("class","incident hover");
                d3.select(this).attr("fill","lightsalmon");
            })
            .on("mouseout", function(d){
                d3.select(this).attr("fill",'black');})
    });
/* svg.select('circle02')
     .data([{long: -71.060788, lat:42.355295}])
     .
     //bind a single data point, with the long lat of Boston
     //note that long is negative because it is a W long point!
     .enter()
     .append('circle02')
     .attr('cx', function (d){
         return albersProjection([d.long, d.lat])[0]
     })
     .attr('cy', function (d){
         return albersProjection([d.long, d.lat])[1]
     })
     .attr('r', 3)
     .attr('fill','orange')*/





