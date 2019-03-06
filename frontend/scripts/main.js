
var margin = 50;
var width = 600;
var height = 400;

var dataGroup = d3.select(".graph").append("svg")
  .attr("width", width + margin)
  .attr("height", height + 2 * margin)
  .append("g")
  .attr("transform", "translate(" + margin + ", " + margin + ")");

function showGraph() {
    var radios = document.getElementsByName('optradio');
    var cInput = document.getElementById('c').value;

    d3.selectAll('svg > g > *').remove();

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
        var randomLineData = [{"x": 0.0, "y": 0.0}, {"x": 1.0, "y": 1.0}];

        var line = d3.line()
            .x(d => x(d.fpr))
            .y(d => y(d.tpr));

        var randomLine = d3.line()
            .x(d => x(d.x))
            .y(d => y(d.y));

        var x = d3.scaleLinear()
            .domain(d3.extent(data, function (d) {
                return d.fpr;
            }))
            .range([0, width - 20]);

        var y = d3.scaleLinear()
            .domain(d3.extent(data, function (d) {
                return d.tpr;
            }))
            .range([height, 0]);

        dataGroup.append("path")
            .data([data])
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("d", line);

        dataGroup.append("path")
            .data([randomLineData])
            .attr("fill", "none")
            .style("stroke-dasharray", ("3, 3"))
            .attr("stroke", "black")
            .attr("d", randomLine);

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
    });
}

