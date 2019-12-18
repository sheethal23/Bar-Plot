
/*Randomly generates five values in the range of 
80 to 200 and stores them in dataset*/

var dataset = []
while(dataset.length < 5){
    var r = Math.floor(Math.random()*((200-80) + 1) + 80);
    if(dataset.indexOf(r) === -1) dataset.push(r);
}

/*Initializing the width, height of svg container 
and calculating the barwidth. padding between bars 
is set to 5*/

var svgWidth = 500, svgHeight = 300, barPadding = 5;
var barWidth = (svgWidth / dataset.length);

/*Select the svg container and set the attributes
of width and height*/

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function() {
    return "<strong>Heights of rectangles:</strong> <span style='color:white'>" + dataset + "</span>";
  })  

var svg = d3.select('svg')
    .attr("width", svgWidth)
    .attr("height", svgHeight);  

svg.call(tip);                                     //calling the tip 

/*create a barchart and select all rectangles and 
set the attributes width, height, y, transform to each rectangle*/    

var barChart = svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")                               //rectangle is appended for each item in the dataset inside a svg container 
    .attr("width", barWidth - barPadding)
    .attr("height", function(d) { 
        return d; 
    })
    .attr("y", function(d) {
         return svgHeight - d 
    })
    .attr("fill", "#115D8C")
    .attr("class", "bar")
    .attr("transform", function (d, i) {
        var translate = [barWidth * i, 0];      //each bar is translated as one after the other
        return "translate("+ translate +")";
    })
    .on("mouseover",  function() {               //mouseover event
           barChart.sort(function(a, b) {       //sort function to sort the bars in ascending order
                        return d3.ascending(a, b);
                    })
                    .transition()
                    .delay(function(d, i) {
                        return i * 50;          // gives it a smoother effect
                    })
                    .duration(1000)
                    .attr("transform", function(d, i) {
                        var translate = [barWidth * i, 0]; 
                        return "translate("+ translate +")";
                    })
            d3.select(this)
                .attr("fill", "#adbce6")
                .call(tip.show);
            

        })
   .on("mouseout", function() {                  //mouseout event
            d3.select(this).attr("fill", "#115D8C")
                           .call(tip.hide); 

        })
   .on("click", function() {
                    barChart.sort(function(a, b) {       //sort function to sort the bars in ascending order
                        return d3.descending(a, b);
                    })
                    .transition()
                    .delay(function(d, i) {
                        return i * 50;          // gives it a smoother effect
                    })
                    .duration(1000)
                    .attr("transform", function(d, i) {
                        var translate = [barWidth * i, 0]; 
                        return "translate("+ translate +")";
                    })
           d3.select(this).attr("fill", "black");
   }); 


