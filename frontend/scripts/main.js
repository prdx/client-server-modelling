
var margin = 50;
var width = 600;
var height = 400;

var dataGroup = d3.select(".graph").append("svg")
  .attr("width", width + margin)
  .attr("height", height + 2 * margin)
  .append("g")
  .attr("transform", "translate(" + margin + ", " + margin + ")");


dataGroup.append("text")
  .attr("x", (width / 2))             
  .attr("y", 0 - (margin / 2))
  .attr("text-anchor", "middle")  
  .style("font-size", "16px") 
  .text("ROC Curve");

var x = d3.scaleLinear()
  .domain([0,1])
  .range([0, width - 20]);

var y = d3.scaleLinear()
  .domain([0,1])
  .range([height, 0]);

var xAxisGroup = dataGroup
  .append("g")
  .attr("class", "xAxisGroup")
  .attr("transform", "translate(0," + height + ")");

var xAxis = d3.axisBottom(x).ticks(5);

xAxis(xAxisGroup);

var yAxisGroup = dataGroup
  .append("g")
  .attr("class", "yAxisGroup");

var yAxis = d3.axisLeft(y).ticks(5);

yAxis(yAxisGroup);

var randomLineData = [{"x": 0.0, "y": 0.0}, {"x": 1.0, "y": 1.0}];

var randomLine = d3.line()
  .x(d => x(d.x))
  .y(d => y(d.y));

dataGroup.append("path")
  .data([randomLineData])
  .attr("fill", "none")
  .style("stroke-dasharray", ("3, 3"))
  .attr("stroke", "black")
  .attr("d", randomLine);

//Create X axis label   
dataGroup.append("text")
  .attr("x", width / 2 )
  .attr("y",  height + 35 )
  .style("text-anchor", "middle")
  .text("False Positive Rate");

//Create Y axis label
dataGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", -45 )
  .attr("x",0 - (height / 2))
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .text("True Positive Rate"); 

function showGraph() {
    var radios = document.getElementsByName('optradio');
    var cInput = document.getElementById('c').value;

    d3.select('.line').remove();

    console.log(cInput)

    var preprocess = ""

    if (radios[0].checked) {
        preprocess = "StandardScaler"
    } else {
        preprocess = "MinMaxScaler"
    }

    var link = "http://127.0.0.1:5000/roc/" + preprocess + "/" + cInput;
    console.log(link);

    d3.json(link).then(function(data) {
        console.log(data);

        var line = d3.line()
            .x(d => x(d.fpr))
            .y(d => y(d.tpr));

        var path = dataGroup.append("path")
            .data([data])
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("d", line)
            .attr("class", "line");

        var totalLength = path.node().getTotalLength();

        path.attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition()
            .duration(2000)
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0);

    });
}

