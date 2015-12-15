$(document).on('page:change', function(){

  $("#candidate_id.tweet-frequency").on("change", function() {
    $.ajax({
            url: "/tweets_over_time",
            type: "GET",
            dataType: "json",
            data: { user_id: $("#candidate_id").val() }, // This goes to Controller in params hash, i.e. params[:file_name]
            complete: function() {},
            success: function(data, textStatus, xhr) {
                debugger
                    buildTweetsOverTimeGraph(data.tweets_over_time)
            },
            error: function() {
            }
    });
  });


      function buildTweetsOverTimeGraph(tweetsOverTime) {
        $('svg').remove()
        var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

        var parseDate = d3.time.format("%Y-%m-%d").parse;


        var x = d3.time.scale()
            .range([0, width]);

        var y = d3.scale.linear()
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        var line = d3.svg.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.frequency); });

        var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var data = tweetsOverTime.map(function(d) {
            return {
               date: parseDate(d[0]),
               frequency: d[1]
            };
        
        });


          x.domain(d3.extent(data, function(d) { return d.date; }));
          y.domain(d3.extent(data, function(d) { return d.frequency; }));

          svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis);

          svg.append("g")
              .attr("class", "y axis")
              .call(yAxis)
            .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("Price ($)");

          svg.append("path")
              .datum(data)
              .attr("class", "line")
              .attr("d", line);
    }
});